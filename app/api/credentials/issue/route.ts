import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { issueAndStoreCredential } from '@/lib/trust-plane/store';
import { getServerSessionUser } from '@/lib/auth/server-session';

export const dynamic = 'force-dynamic';

const IssueSchema = z.object({
  trackId: z.string().min(1),
  recipientName: z.string().min(1),
  recipientEmail: z.string().email(),
  badgeName: z.string().min(1),
  badgeDescription: z.string().min(1),
  badgeImageUrl: z.string().url().optional(),
  score: z.number().min(0).max(100).optional(),
  psychometricConfidence: z.string().optional(),
  sessionId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const adminSecret = req.headers.get("x-admin-secret");
    const expectedSecret = process.env.ADMIN_SECRET_KEY;
    const isAdmin = Boolean(expectedSecret && adminSecret && adminSecret === expectedSecret);

    let sessionUser = null;
    if (!isAdmin) {
      sessionUser = await getServerSessionUser();
      if (!sessionUser) {
        return NextResponse.json(
          { error: "Unauthorized. Credential issuance requires verified session authentication or valid admin secret." },
          { status: 401 }
        );
      }
    }

    const body = await req.json();
    const parsed = IssueSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid credential issuance payload', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const {
      trackId,
      recipientName,
      recipientEmail,
      badgeName,
      badgeDescription,
      badgeImageUrl,
      score,
      psychometricConfidence,
      sessionId,
    } = parsed.data;

    // Security Gate: Non-admin caller cannot forge credentials for other emails (SEC-06, PASS-02)
    if (!isAdmin && sessionUser && sessionUser.email.toLowerCase() !== recipientEmail.toLowerCase()) {
      return NextResponse.json(
        { error: "Forbidden. Cannot issue credentials for an email address other than your verified authenticated account." },
        { status: 403 }
      );
    }

    const record = issueAndStoreCredential({
      trackId,
      recipientName,
      recipientEmail,
      badgeName,
      badgeDescription,
      badgeImageUrl: badgeImageUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      score,
      psychometricConfidence,
      sessionId,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://career.insyt.bd';
    const verifyUrl = `${baseUrl}/verify/${record.id}`;

    return NextResponse.json({
      success: true,
      credentialId: record.id,
      verifyUrl,
      credential: record.credential,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to issue verifiable credential', message: err.message },
      { status: 500 }
    );
  }
}
