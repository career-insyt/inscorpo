/**
 * INSYT Trust Plane — Type Definitions
 * Covers W3C Verifiable Credentials 2.0 & Open Badges 3.0 verification structures.
 */

export interface TaxonomyAlignment {
  targetFramework: string;
  targetName: string;
  targetDescription: string;
  targetCode: string;
  targetUrl: string;
}

export interface EvidenceItem {
  id?: string;
  type?: string[];
  description?: string;
  score?: number;
  psychometricConfidence?: string;
  [key: string]: any;
}

export interface VerificationResult {
  verified: boolean;
  status: "VALID" | "RECORD_NOT_FOUND" | "INVALID_SIGNATURE" | "REVOKED" | "EXPIRED" | string;
  error?: string;
  issuer?: {
    id?: string;
    name?: string;
    url?: string;
    [key: string]: any;
  };
  issuedAt?: string;
  recipient?: string;
  recipientHash?: string;
  badge?: {
    name?: string;
    description?: string;
    image?: string;
    criteria?: {
      id?: string;
      narrative?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  evidence?: EvidenceItem[];
  proof?: {
    type?: string;
    cryptosuite?: string;
    created?: string;
    verificationMethod?: string;
    proofPurpose?: string;
    proofValue?: string;
    [key: string]: any;
  };
  taxonomyAlignments?: TaxonomyAlignment[];
  rawCredential?: Record<string, any>;
}
