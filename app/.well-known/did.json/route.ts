import { NextResponse } from 'next/server';
import { getIssuerKeys } from '@/lib/trust-plane/crypto';

export const dynamic = 'force-dynamic';

export async function GET() {
  const issuerDid = process.env.NEXT_PUBLIC_ISSUER_DID || 'did:web:insyt.co';
  const { multikey } = getIssuerKeys();

  const didDocument = {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
      'https://w3id.org/security/multikey/v1',
    ],
    id: issuerDid,
    alsoKnownAs: ['https://insyt.co'],
    verificationMethod: [
      {
        id: `${issuerDid}#key-1`,
        type: 'Multikey',
        controller: issuerDid,
        publicKeyMultibase: multikey,
      },
    ],
    authentication: [`${issuerDid}#key-1`],
    assertionMethod: [`${issuerDid}#key-1`],
    service: [
      {
        id: `${issuerDid}#credentials-service`,
        type: 'CredentialIssuanceService',
        serviceEndpoint: 'https://insyt.co/api/credentials/verify',
      },
    ],
  };

  return NextResponse.json(didDocument, {
    headers: {
      'Content-Type': 'application/did+ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
