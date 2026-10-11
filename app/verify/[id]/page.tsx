import { Metadata } from 'next';
import { getCredentialById } from '@/lib/trust-plane/store';
import { verifyDocumentProof, getIssuerKeys, isCredentialRevoked } from '@/lib/trust-plane/crypto';
import { getTaxonomyAlignments } from '@/lib/taxonomy/skills';
import { PublicVerifierView } from '@/components/trust-plane/public-verifier-view';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const record = getCredentialById(id);

  if (!record) {
    return {
      title: 'Credential Verification | INSYT Corporate Trust Plane',
      description: 'Public cryptographic credential verification service.',
    };
  }

  const badgeName = record.credential.credentialSubject?.achievement?.name || 'Professional Certification';
  const recipient = record.credential.credentialSubject?.name || 'Candidate';

  return {
    title: `Verified Credential: ${badgeName} — ${recipient} | INSYT Corporate`,
    description: `Official cryptographically verified Open Badge 3.0 / W3C Verifiable Credential issued to ${recipient}.`,
  };
}

export default async function VerifyPage({ params }: PageProps) {
  const { id } = await params;
  const record = getCredentialById(id);

  if (!record) {
    return (
      <PublicVerifierView
        id={id}
        result={{
          verified: false,
          status: 'RECORD_NOT_FOUND',
          error: 'No cryptographically registered credential exists with the supplied identifier. INSYT Trust Plane fails closed for unverified records.',
        }}
      />
    );
  }

  const { publicKeyPem } = getIssuerKeys();
  const credential = record.credential;

  // 1. Verify Ed25519 signature
  const sigCheck = verifyDocumentProof(credential, publicKeyPem);
  if (!sigCheck.verified) {
    return (
      <PublicVerifierView
        id={id}
        result={{
          verified: false,
          status: 'INVALID_SIGNATURE',
          error: `Cryptographic proof signature check failed: ${sigCheck.error}`,
        }}
      />
    );
  }

  // 2. Verify Revocation Status
  const isRevoked = isCredentialRevoked(record.statusIndex);
  if (isRevoked) {
    return (
      <PublicVerifierView
        id={id}
        result={{
          verified: false,
          status: 'REVOKED',
          error: `This credential (index #${record.statusIndex}) was officially revoked by the issuing authority.`,
        }}
      />
    );
  }

  // 3. Verify Expiration
  if (credential.validUntil && Date.now() > new Date(credential.validUntil).getTime()) {
    return (
      <PublicVerifierView
        id={id}
        result={{
          verified: false,
          status: 'EXPIRED',
          error: `This credential expired on ${credential.validUntil}.`,
        }}
      />
    );
  }

  const achievement = credential.credentialSubject?.achievement;
  const badgeName = achievement?.name || 'Professional Certification';
  const alignments = achievement?.alignment || getTaxonomyAlignments(badgeName);

  return (
    <PublicVerifierView
      id={id}
      result={{
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
        rawCredential: credential,
      }}
    />
  );
}
