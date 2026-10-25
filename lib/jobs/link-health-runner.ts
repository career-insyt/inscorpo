import type { CanonicalJob } from "./canonical-job-schema";

export interface LinkVerificationResult {
  jobId: string;
  officialPortalUrl: string;
  isLive: boolean;
  httpStatus: number;
  detectedSoft404OrClosed: boolean;
  closureReason: string | null;
  waybackSnapshotUrl: string | null;
  verifiedAtIso: string;
}

const CLOSURE_PATTERNS: RegExp[] = [
  /\b(this job is no longer available|position has been filled|applications are closed)\b/i,
  /\b(job posting has expired|no longer accepting applications|requisition is closed)\b/i,
  /\b(application time is over|no circular is active right now)\b/i,
  /(আবেদনের সময়সীমা শেষ হয়েছে|নিয়োগ বিজ্ঞপ্তির মেয়াদ উত্তীর্ণ)/,
];

const GENERIC_ROOT_REDIRECT_PATHS = new Set([
  "/",
  "/careers",
  "/careers/",
  "/jobs",
  "/jobs/",
  "/404",
  "/error",
]);

export async function verifyJobLinkHealth(
  job: CanonicalJob
): Promise<LinkVerificationResult> {
  const verifiedAtIso = new Date().toISOString();
  let waybackSnapshotUrl = job.waybackSnapshotUrl;

  try {
    const headResponse = await fetch(job.officialPortalUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Range: "bytes=0-65535",
      },
      redirect: "manual",
    });

    const status = headResponse.status;

    // Detect Root Redirects (Soft-404)
    if ([301, 302, 307, 308].includes(status)) {
      const location = headResponse.headers.get("location");
      if (location) {
        try {
          const redirectUrl = new URL(location, job.officialPortalUrl);
          if (GENERIC_ROOT_REDIRECT_PATHS.has(redirectUrl.pathname)) {
            return {
              jobId: job.id,
              officialPortalUrl: job.officialPortalUrl,
              isLive: false,
              httpStatus: status,
              detectedSoft404OrClosed: true,
              closureReason: `Redirected to generic root path: ${redirectUrl.pathname}`,
              waybackSnapshotUrl,
              verifiedAtIso,
            };
          }
        } catch {
          // invalid location header
        }
      }
    }

    if (status === 404 || status === 410) {
      return {
        jobId: job.id,
        officialPortalUrl: job.officialPortalUrl,
        isLive: false,
        httpStatus: status,
        detectedSoft404OrClosed: true,
        closureReason: `HTTP ${status} Not Found / Gone`,
        waybackSnapshotUrl,
        verifiedAtIso,
      };
    }

    // Inspect Content for Closure Markers
    const htmlSnippet = await headResponse.text();
    for (const pattern of CLOSURE_PATTERNS) {
      if (pattern.test(htmlSnippet)) {
        return {
          jobId: job.id,
          officialPortalUrl: job.officialPortalUrl,
          isLive: false,
          httpStatus: status,
          detectedSoft404OrClosed: true,
          closureReason: `Matched closure pattern: ${pattern.source}`,
          waybackSnapshotUrl,
          verifiedAtIso,
        };
      }
    }

    // Snapshot with Wayback Machine if missing
    if (!waybackSnapshotUrl) {
      try {
        const waybackCheck = await fetch(
          `https://archive.org/wayback/available?url=${encodeURIComponent(job.officialPortalUrl)}`,
          { headers: { "User-Agent": "CareerINSYT-Archiver/1.0" } }
        );
        if (waybackCheck.ok) {
          const waybackJson = await waybackCheck.json();
          if (waybackJson?.archived_snapshots?.closest?.available) {
            waybackSnapshotUrl = waybackJson.archived_snapshots.closest.url;
          }
        }
      } catch {
        // Wayback rate limited or down; proceed gracefully
      }
    }

    return {
      jobId: job.id,
      officialPortalUrl: job.officialPortalUrl,
      isLive: true,
      httpStatus: status,
      detectedSoft404OrClosed: false,
      closureReason: null,
      waybackSnapshotUrl,
      verifiedAtIso,
    };
  } catch (error: any) {
    return {
      jobId: job.id,
      officialPortalUrl: job.officialPortalUrl,
      isLive: false,
      httpStatus: 0,
      detectedSoft404OrClosed: false,
      closureReason: error?.message || "Network Timeout",
      waybackSnapshotUrl,
      verifiedAtIso,
    };
  }
}
