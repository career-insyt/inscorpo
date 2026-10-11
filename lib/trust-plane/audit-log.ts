/**
 * INSYT Trust Plane — Append-Only Hash-Chained Audit Log
 *
 * Implements a cryptographically tamper-evident event ledger for high-stakes assessments:
 *   h_0 = SHA-256(GENESIS)
 *   h_n = SHA-256(h_{n-1} || canonical(event_n))
 *
 * Any retroactive alteration, insertion, or deletion breaks the cryptographic chain.
 */

import { canonicalize, sha256 } from './crypto';

export type AuditEventType =
  | 'SESSION_INITIALIZED'
  | 'ITEM_DELIVERED'
  | 'RESPONSE_SUBMITTED'
  | 'PROCTOR_TELEMETRY'
  | 'PERTURBATION_EXECUTED'
  | 'INJECTION_SCAN_PASSED'
  | 'INJECTION_SCAN_BLOCKED'
  | 'ABILITY_ESTIMATED'
  | 'STOPPING_RULE_TRIGGERED'
  | 'CREDENTIAL_ISSUED'
  | 'CREDENTIAL_REVOKED';

export interface AuditEventPayload {
  sessionId: string;
  candidateId: string;
  eventType: AuditEventType;
  timestamp: string;
  data: Record<string, any>;
}

export interface AuditLogEntry {
  sequenceNumber: number;
  previousHash: string;
  currentHash: string;
  event: AuditEventPayload;
  recordedAt: string;
}

const GENESIS_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

class AuditLogLedger {
  private ledger: AuditLogEntry[] = [];

  constructor() {
    // In production, this can be synced/rehydrated from persistent Appwrite collections or cold storage
  }

  /**
   * Records a new event onto the tamper-evident hash chain
   */
  public record(payload: Omit<AuditEventPayload, 'timestamp'>): AuditLogEntry {
    const timestamp = new Date().toISOString();
    const event: AuditEventPayload = {
      ...payload,
      timestamp,
    };

    const previousHash = this.ledger.length === 0
      ? GENESIS_HASH
      : this.ledger[this.ledger.length - 1].currentHash;

    const canonicalEvent = canonicalize(event);
    const currentHash = sha256(previousHash + canonicalEvent);

    const entry: AuditLogEntry = {
      sequenceNumber: this.ledger.length + 1,
      previousHash,
      currentHash,
      event,
      recordedAt: timestamp,
    };

    this.ledger.push(entry);
    return entry;
  }

  /**
   * Returns all audit events for a given assessment session
   */
  public getSessionTrail(sessionId: string): AuditLogEntry[] {
    return this.ledger.filter(entry => entry.event.sessionId === sessionId);
  }

  /**
   * Returns all audit events across the ledger
   */
  public getAllEntries(): AuditLogEntry[] {
    return [...this.ledger];
  }

  /**
   * Validates the integrity of the entire hash chain or a slice.
   * Returns true if all hashes match precisely; false if any entry was tampered with.
   */
  public verifyChain(entries: AuditLogEntry[] = this.ledger): { valid: boolean; brokenAt?: number; error?: string } {
    if (entries.length === 0) return { valid: true };

    for (let i = 0; i < entries.length; i++) {
      const current = entries[i];
      const expectedPrev = i === 0 ? GENESIS_HASH : entries[i - 1].currentHash;

      if (current.previousHash !== expectedPrev) {
        return {
          valid: false,
          brokenAt: current.sequenceNumber,
          error: `Broken link: previousHash mismatch at seq ${current.sequenceNumber}`,
        };
      }

      const canonicalEvent = canonicalize(current.event);
      const computedHash = sha256(current.previousHash + canonicalEvent);

      if (current.currentHash !== computedHash) {
        return {
          valid: false,
          brokenAt: current.sequenceNumber,
          error: `Tampered event data: currentHash mismatch at seq ${current.sequenceNumber}`,
        };
      }
    }

    return { valid: true };
  }
}

// Global in-memory singleton for the application
const globalAuditLedger = new AuditLogLedger();

export function recordAuditEvent(payload: Omit<AuditEventPayload, 'timestamp'>): AuditLogEntry {
  return globalAuditLedger.record(payload);
}

export function getSessionAuditTrail(sessionId: string): AuditLogEntry[] {
  return globalAuditLedger.getSessionTrail(sessionId);
}

export function verifyAuditChain(entries?: AuditLogEntry[]) {
  return globalAuditLedger.verifyChain(entries);
}
