import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { issueAndStoreCredential } from '@/lib/trust-plane/store';

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

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://insyt.co';
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
