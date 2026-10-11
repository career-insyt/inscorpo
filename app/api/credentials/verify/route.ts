import { NextRequest, NextResponse } from 'next/server';
import {
  verifyDocumentProof,
  getIssuerKeys,
  isCredentialRevoked,
} from '@/lib/trust-plane/crypto';
import { getCredentialById } from '@/lib/trust-plane/store';
import { getSessionAuditTrail } from '@/lib/trust-plane/audit-log';
import { getTaxonomyAlignments } from '@/lib/taxonomy/skills';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ verified: false, error: 'Missing credential ID' }, { status: 400 });
  }

  return handleVerification(id);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.credentialId || body.id;

    if (id) {
      return handleVerification(id);
    }

    if (body.credential) {
      return verifyRawCredential(body.credential);
    }

    return NextResponse.json({ verified: false, error: 'Missing credential or credential ID' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ verified: false, error: 'Invalid JSON payload' }, { status: 400 });
  }
}

function handleVerification(id: string) {
  const record = getCredentialById(id);

  if (!record) {
    return NextResponse.json(
      {
        verified: false,
        status: 'RECORD_NOT_FOUND',
        error: 'No cryptographically registered credential exists with the supplied ID',
      },
      { status: 404 }
    );
  }

  return verifyRawCredential(record.credential, record.statusIndex);
}

function verifyRawCredential(credential: Record<string, any>, knownStatusIndex?: number) {
  const { publicKeyPem } = getIssuerKeys();

  // 1. Cryptographic Signature Verification
  const sigCheck = verifyDocumentProof(credential, publicKeyPem);
  if (!sigCheck.verified) {
    return NextResponse.json(
      {
        verified: false,
        status: 'INVALID_SIGNATURE',
        error: `Cryptographic proof check failed: ${sigCheck.error}`,
      },
      { status: 200 }
    );
  }

  // 2. Revocation Verification via W3C Bitstring Status List
  const statusEntry = credential.credentialStatus;
  const statusIndex = knownStatusIndex ?? (statusEntry ? parseInt(statusEntry.statusListIndex, 10) : undefined);

  if (statusIndex !== undefined && !isNaN(statusIndex)) {
    const revoked = isCredentialRevoked(statusIndex);
    if (revoked) {
      return NextResponse.json(
        {
          verified: false,
          status: 'REVOKED',
          error: `Credential index #${statusIndex} has been cryptographically revoked by the issuer`,
          revocationDetails: {
            statusListCredential: statusEntry?.statusListCredential,
            statusIndex,
          },
        },
        { status: 200 }
      );
    }
  }

  // 3. Expiration Check
  if (credential.validUntil) {
    const expiration = new Date(credential.validUntil).getTime();
    if (Date.now() > expiration) {
      return NextResponse.json(
        {
          verified: false,
          status: 'EXPIRED',
          error: `Credential expired on ${credential.validUntil}`,
        },
        { status: 200 }
      );
    }
  }

  // 4. Resolve Taxonomy Alignments & Subject Info
  const achievement = credential.credentialSubject?.achievement;
  const badgeName = achievement?.name || 'Professional Certification';
  const alignments = achievement?.alignment || getTaxonomyAlignments(badgeName);

  // 5. Retrieve Audit Trail
  const credentialId = credential.id?.replace(/^urn:uuid:/, '');
  const auditTrail = credentialId ? getSessionAuditTrail(`session-${credentialId}`) : [];

  return NextResponse.json({
    verified: true,
    status: 'VALID',
    issuer: credential.issuer,
    issuedAt: credential.validFrom,
    recipient: credential.credentialSubject?.name,
    recipientHash: credential.credentialSubject?.id,
    badge: {
      name: achievement?.name,
      description: achievement?.description,
      image: achievement?.image?.id,
      criteria: achievement?.criteria,
    },
    evidence: credential.evidence,
    proof: credential.proof,
    taxonomyAlignments: alignments,
    auditTrailSummary: {
      eventsLogged: auditTrail.length,
      latestHash: auditTrail[auditTrail.length - 1]?.currentHash,
    },
  });
}
