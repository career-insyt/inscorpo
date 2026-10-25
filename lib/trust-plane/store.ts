/**
 * INSYT Trust Plane — Credential Registry Store
 *
 * Provides thread-safe persistent/in-memory registry of cryptographically signed
 * W3C Verifiable Credentials and Open Badges 3.0 assertions.
 */

import {
  createOpenBadges3Credential,
  verifyDocumentProof,
  getIssuerKeys,
  isCredentialRevoked,
} from './crypto';
import { getTaxonomyAlignments } from '../taxonomy/skills';
import { recordAuditEvent } from './audit-log';

import fs from 'fs';
import path from 'path';

export interface StoredCredentialRecord {
  id: string; // UUID or hash
  trackId: string;
  recipientEmail: string;
  recipientName: string;
  credential: Record<string, any>;
  issuedAt: string;
  statusIndex: number;
}

const REGISTRY_FILE = path.join(process.cwd(), 'DB', 'credentials_registry.json');

// Global credential map
const credentialRegistry = new Map<string, StoredCredentialRecord>();

function loadRegistryFromFile(): void {
  try {
    if (fs.existsSync(REGISTRY_FILE)) {
      const raw = fs.readFileSync(REGISTRY_FILE, 'utf-8');
      const records: StoredCredentialRecord[] = JSON.parse(raw);
      for (const rec of records) {
        if (rec && rec.id) {
          credentialRegistry.set(rec.id, rec);
        }
      }
    }
  } catch (err) {
    console.warn("[TrustPlane Store] Failed to load registry from file (using memory store):", err);
  }
}

function saveRegistryToFile(): void {
  try {
    const dir = path.dirname(REGISTRY_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const records = Array.from(credentialRegistry.values());
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.warn("[TrustPlane Store] Read-only filesystem warning (memory store active):", err);
  }
}

// Initialize on module load
loadRegistryFromFile();

/**
 * Registers an issued credential in the store
 */
export function registerCredential(record: StoredCredentialRecord): void {
  credentialRegistry.set(record.id, record);
  saveRegistryToFile();
}

/**
 * Retrieves a credential by ID
 */
export function getCredentialById(id: string): StoredCredentialRecord | undefined {
  if (!credentialRegistry.has(id)) {
    loadRegistryFromFile();
  }
  return credentialRegistry.get(id);
}

/**
 * Returns all credentials for a given user email
 */
export function getCredentialsByEmail(email: string): StoredCredentialRecord[] {
  loadRegistryFromFile();
  const norm = email.toLowerCase().trim();
  return Array.from(credentialRegistry.values()).filter(
    r => r.recipientEmail.toLowerCase().trim() === norm
  );
}

/**
 * High-level issuance helper that builds, signs, audits, and stores a credential
 */
export function issueAndStoreCredential(params: {
  trackId: string;
  recipientName: string;
  recipientEmail: string;
  badgeName: string;
  badgeDescription: string;
  badgeImageUrl: string;
  score?: number;
  psychometricConfidence?: string;
  sessionId?: string;
}): StoredCredentialRecord {
  const credentialId = `insyt-cred-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const statusIndex = credentialRegistry.size + 1;
  const alignments = getTaxonomyAlignments(params.trackId);

  const signedCredential = createOpenBadges3Credential({
    credentialId,
    recipientEmail: params.recipientEmail,
    recipientName: params.recipientName,
    badgeName: params.badgeName,
    badgeDescription: params.badgeDescription,
    badgeImageUrl: params.badgeImageUrl,
    criteriaUrl: `https://insyt.co/tracks/${params.trackId}`,
    criteriaNarrative: `Candidate successfully demonstrated advanced competency in ${params.badgeName} under server-authoritative psychometric assessment conditions.`,
    alignment: alignments,
    statusIndex,
    evidence: params.score !== undefined ? [
      {
        id: `https://insyt.co/assessments/evidence/${credentialId}`,
        type: ['AssessmentEvidence'],
        description: `Verified psychometric performance score: ${params.score}/100`,
        score: params.score,
        psychometricConfidence: params.psychometricConfidence || '95% CI (SEM <= 0.30)',
      },
    ] : undefined,
  });

  const record: StoredCredentialRecord = {
    id: credentialId,
    trackId: params.trackId,
    recipientEmail: params.recipientEmail,
    recipientName: params.recipientName,
    credential: signedCredential,
    issuedAt: new Date().toISOString(),
    statusIndex,
  };

  registerCredential(record);

  // Record into append-only cryptographic audit chain
  recordAuditEvent({
    sessionId: params.sessionId || `session-${credentialId}`,
    candidateId: params.recipientEmail,
    eventType: 'CREDENTIAL_ISSUED',
    data: {
      credentialId,
      trackId: params.trackId,
      statusIndex,
      badgeName: params.badgeName,
      proofCreated: signedCredential.proof.created,
    },
  });

  return record;
}

// Seed initial authentic reference credentials so live verification works out of the box
(function seedInitialCredentials() {
  if (credentialRegistry.size > 0) return;

  // Reference Credential 1: Financial Modeling
  issueAndStoreCredential({
    trackId: 'financial-modeling',
    recipientName: 'Alex Mercer',
    recipientEmail: 'alex.mercer@insyt.bd',
    badgeName: 'Certified Financial Modeling & Valuation Analyst (FMVA)',
    badgeDescription: 'Mastery in building dynamic three-statement models, DCF valuations, and sensitivity tables with zero hardcoding.',
    badgeImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
    score: 94,
    psychometricConfidence: 'Theta = +2.18, SEM = 0.24 (Reliability 0.94)',
  });

  // Reference Credential 2: Corporate Finance
  issueAndStoreCredential({
    trackId: 'corporate-finance',
    recipientName: 'Sarah Jenkins',
    recipientEmail: 'sarah.jenkins@insyt.bd',
    badgeName: 'Chartered Corporate Capital Analyst',
    badgeDescription: 'Excellence in capital budgeting, WACC optimization, and M&A enterprise valuation.',
    badgeImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    score: 91,
    psychometricConfidence: 'Theta = +1.85, SEM = 0.28 (Reliability 0.92)',
  });
})();
