import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { CanonicalJob, CanonicalJobSchema } from "./canonical-job-schema";

const DB_FILE_PATH = path.join(process.cwd(), "DB", "canonical_jobs.json");

export interface JobFilterOptions {
  sector?: string;
  opportunityType?: string;
  searchQuery?: string;
  divisionLocation?: string;
  workplaceType?: string;
  currency?: string;
  minSalary?: number;
  maxSalary?: number;
  onlyLiveVerified?: boolean;
}

export interface JobRepositoryStats {
  totalJobs: number;
  sectorBreakdown: Record<string, number>;
  opportunityTypeBreakdown: Record<string, number>;
  liveVerifiedCount: number;
  archivedCount: number;
  remoteUsdCount: number;
  oldestPublicationDate: string | null;
  youngestPublicationDate: string | null;
  lastSyncTimestamp: string;
}

class CanonicalJobStore {
  private cache: Map<string, CanonicalJob> = new Map();
  private fingerprintIndex: Map<string, string> = new Map(); // hash -> id
  private lastLoadedMtime = 0;
  private initialized = false;

  private ensureInitialized() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const stat = fs.statSync(DB_FILE_PATH);
        if (this.initialized && stat.mtimeMs <= this.lastLoadedMtime) {
          return;
        }
        this.loadFromDisk();
        this.lastLoadedMtime = stat.mtimeMs;
        this.initialized = true;
        return;
      }
    } catch (err: any) {
      console.error("[CanonicalJobStore] Stat check error:", err.message);
    }
    if (this.initialized) return;
    this.loadFromDisk();
    this.initialized = true;
  }

  private loadFromDisk() {
    try {
      if (!fs.existsSync(DB_FILE_PATH)) {
        // Initialize with empty array file
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
        return;
      }

      const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        this.cache.clear();
        this.fingerprintIndex.clear();
        list.forEach((item) => {
          const parsed = CanonicalJobSchema.safeParse(item);
          if (parsed.success) {
            this.cache.set(parsed.data.id, parsed.data);
            this.fingerprintIndex.set(parsed.data.fingerprintHash, parsed.data.id);
          }
        });
      }
    } catch (err: any) {
      console.error("[CanonicalJobStore] Error loading canonical jobs from disk:", err.message);
    }
  }

  private flushToDisk() {
    try {
      const items = Array.from(this.cache.values());
      const tempPath = `${DB_FILE_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(items, null, 2), "utf-8");
      fs.renameSync(tempPath, DB_FILE_PATH);
    } catch (err: any) {
      console.error("[CanonicalJobStore] Error saving canonical jobs to disk:", err.message);
    }
  }

  public getAllJobs(filters?: JobFilterOptions): CanonicalJob[] {
    this.ensureInitialized();
    let results = Array.from(this.cache.values());

    if (!filters) return results;

    if (filters.sector && filters.sector !== "ALL") {
      results = results.filter((j) => j.sector === filters.sector);
    }

    if (filters.opportunityType && filters.opportunityType !== "ALL") {
      results = results.filter((j) => j.opportunityType === filters.opportunityType);
    }

    if (filters.workplaceType && filters.workplaceType !== "ALL") {
      results = results.filter((j) => j.workplaceType === filters.workplaceType);
    }

    if (filters.divisionLocation && filters.divisionLocation !== "ALL") {
      results = results.filter((j) =>
        j.divisionLocation.toLowerCase().includes(filters.divisionLocation!.toLowerCase())
      );
    }

    if (filters.currency) {
      results = results.filter((j) => j.currency === filters.currency);
    }

    if (filters.onlyLiveVerified) {
      results = results.filter((j) => j.archiveStatus === "LIVE_VERIFIED" && !j.isExpired);
    }

    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.organizationName.toLowerCase().includes(q) ||
          (j.organizationAcronym && j.organizationAcronym.toLowerCase().includes(q)) ||
          j.summaryPlainText.toLowerCase().includes(q) ||
          j.competencies.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    // Sort by publication timestamp descending
    results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return results;
  }

  public getJobById(id: string): CanonicalJob | null {
    this.ensureInitialized();
    const direct = this.cache.get(id);
    if (direct) return direct;

    const lowerId = id.toLowerCase();
    for (const job of this.cache.values()) {
      if (job.id.toLowerCase() === lowerId) return job;
    }
    return null;
  }

  public upsertJob(job: CanonicalJob): boolean {
    this.ensureInitialized();
    const parsed = CanonicalJobSchema.safeParse(job);
    if (!parsed.success) {
      console.warn("[CanonicalJobStore] Invalid job schema:", parsed.error.issues);
      return false;
    }

    const validJob = parsed.data;

    // Check fingerprint collision
    const existingId = this.fingerprintIndex.get(validJob.fingerprintHash);
    if (existingId && existingId !== validJob.id) {
      // Fingerprint collision: merge records in favor of official upstream
      const existing = this.cache.get(existingId);
      if (existing) {
        const merged: CanonicalJob = {
          ...existing,
          ...validJob,
          id: existing.id, // Preserve established ID
          waybackSnapshotUrl: existing.waybackSnapshotUrl || validJob.waybackSnapshotUrl,
          lastVerifiedLiveAt: new Date().toISOString(),
        };
        this.cache.set(existing.id, merged);
        this.flushToDisk();
        return true;
      }
    }

    this.cache.set(validJob.id, validJob);
    this.fingerprintIndex.set(validJob.fingerprintHash, validJob.id);
    this.flushToDisk();
    return true;
  }

  public upsertJobsBatch(jobs: CanonicalJob[]): { inserted: number; updated: number } {
    this.ensureInitialized();
    let inserted = 0;
    let updated = 0;

    for (const job of jobs) {
      const parsed = CanonicalJobSchema.safeParse(job);
      if (!parsed.success) continue;

      const validJob = parsed.data;
      if (this.cache.has(validJob.id) || this.fingerprintIndex.has(validJob.fingerprintHash)) {
        const targetId = this.cache.has(validJob.id)
          ? validJob.id
          : this.fingerprintIndex.get(validJob.fingerprintHash)!;
        this.cache.set(targetId, { ...this.cache.get(targetId)!, ...validJob, id: targetId });
        updated++;
      } else {
        this.cache.set(validJob.id, validJob);
        this.fingerprintIndex.set(validJob.fingerprintHash, validJob.id);
        inserted++;
      }
    }

    if (inserted > 0 || updated > 0) {
      this.flushToDisk();
    }

    return { inserted, updated };
  }

  public getStats(): JobRepositoryStats {
    this.ensureInitialized();
    const jobs = Array.from(this.cache.values());

    const sectorBreakdown: Record<string, number> = {};
    const opportunityTypeBreakdown: Record<string, number> = {};
    let liveVerifiedCount = 0;
    let archivedCount = 0;
    let remoteUsdCount = 0;
    let oldestDate: string | null = null;
    let youngestDate: string | null = null;

    jobs.forEach((j) => {
      sectorBreakdown[j.sector] = (sectorBreakdown[j.sector] || 0) + 1;
      const oType = j.opportunityType || "FULL_TIME_JOB";
      opportunityTypeBreakdown[oType] = (opportunityTypeBreakdown[oType] || 0) + 1;

      if (j.archiveStatus === "LIVE_VERIFIED" && !j.isExpired) liveVerifiedCount++;
      if (j.isExpired || j.archiveStatus === "EXPIRED_ARCHIVED") archivedCount++;
      if (j.sector === "GLOBAL_REMOTE" && j.currency === "USD") remoteUsdCount++;

      if (!oldestDate || new Date(j.publishedAt) < new Date(oldestDate)) {
        oldestDate = j.publishedAt;
      }
      if (!youngestDate || new Date(j.publishedAt) > new Date(youngestDate)) {
        youngestDate = j.publishedAt;
      }
    });

    return {
      totalJobs: jobs.length,
      sectorBreakdown,
      opportunityTypeBreakdown,
      liveVerifiedCount,
      archivedCount,
      remoteUsdCount,
      oldestPublicationDate: oldestDate,
      youngestPublicationDate: youngestDate,
      lastSyncTimestamp: new Date().toISOString(),
    };
  }

  public updateJobHealth(
    jobId: string,
    health: {
      isExpired: boolean;
      archiveStatus: "LIVE_VERIFIED" | "EXPIRING_WITHIN_48H" | "EXPIRED_ARCHIVED" | "SOFT_404_QUARANTINED";
      httpHealthStatus: number;
      waybackSnapshotUrl: string | null;
      lastVerifiedLiveAt: string;
      archiveNotice?: string | null;
    }
  ): boolean {
    this.ensureInitialized();
    const existing = this.cache.get(jobId);
    if (!existing) return false;

    const updated: CanonicalJob = {
      ...existing,
      isExpired: health.isExpired,
      archiveStatus: health.archiveStatus,
      httpHealthStatus: health.httpHealthStatus,
      waybackSnapshotUrl: health.waybackSnapshotUrl || existing.waybackSnapshotUrl,
      lastVerifiedLiveAt: health.lastVerifiedLiveAt,
      archiveNotice: health.archiveNotice !== undefined ? health.archiveNotice : existing.archiveNotice,
    };

    this.cache.set(jobId, updated);
    this.flushToDisk();
    return true;
  }

  public count(): number {
    this.ensureInitialized();
    return this.cache.size;
  }
}

export const canonicalJobStore = new CanonicalJobStore();
