import { NextRequest, NextResponse } from 'next/server';
import {
  getActiveRevocationList,
  getIssuerKeys,
  signDocument,
} from '@/lib/trust-plane/crypto';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://insyt.co';
  const issuerDid = process.env.NEXT_PUBLIC_ISSUER_DID || 'did:web:insyt.co';
  const issuerKeys = getIssuerKeys();

  const statusList = getActiveRevocationList();
  const encodedList = statusList.encode();

  const statusListCredentialPayload = {
    '@context': [
      'https://www.w3.org/ns/credentials/v2',
      'https://w3id.org/vc/status-list',
    ],
    id: `${baseUrl}/api/credentials/status-list/${listId}`,
    type: ['VerifiableCredential', 'BitstringStatusListCredential'],
    issuer: issuerDid,
    validFrom: '2026-01-01T00:00:00Z',
    credentialSubject: {
      id: `${baseUrl}/api/credentials/status-list/${listId}#list`,
      type: 'BitstringStatusList',
      statusPurpose: 'revocation',
      encodedList,
    },
  };

  const signedCredential = signDocument(
    statusListCredentialPayload,
    issuerKeys.privateKeyPem,
    `${issuerDid}#key-1`
  );

  return NextResponse.json(signedCredential, {
    headers: {
      'Content-Type': 'application/vc+ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
