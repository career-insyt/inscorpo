import { NextRequest, NextResponse } from "next/server";
import { parseBkashSms, recordIncomingBkashTransaction } from "@/lib/payments/bkash-ledger";

/**
 * bKash SMS Forwarder Webhook
 * 
 * Accepts SMS notifications sent to 01771047033:
 * E.g., forwarded via Android SMS Forwarder, Tasker, IFTTT or SIM gateway.
 * 
 * Supports both JSON payload:
 * { "message": "You have received Tk 0.01 from 017XXXXXXXX...", "sender": "bKash" }
 * or direct fields:
 * { "trxId": "BKA8X9Z10Q", "senderNumber": "017XXXXXXXX", "amount": 0.01 }
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate forwarder webhook
    const forwarderSecret = request.headers.get("x-forwarder-secret") || request.headers.get("x-admin-secret");
    const expectedSecret = process.env.BKASH_FORWARDER_SECRET || process.env.ADMIN_SECRET_KEY;

    if (!expectedSecret || forwarderSecret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized bKash SMS sync gateway request." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // 1. Direct structured payload
    if (body.trxId && body.senderNumber && body.amount !== undefined) {
      const record = recordIncomingBkashTransaction({
        trxId: body.trxId,
        senderNumber: body.senderNumber,
        amount: Number(body.amount),
        ref: body.ref,
        rawSms: body.rawSms || "Structured API sync",
      });

      return NextResponse.json({
        success: true,
        message: "bKash transaction recorded into ledger successfully.",
        transaction: record,
      });
    }

    // 2. Raw SMS parsing payload
    const rawSms = body.message || body.sms || body.text || body.content || (typeof body === "string" ? body : "");
    if (!rawSms) {
      return NextResponse.json(
        { error: "No SMS content or structured bKash payload detected." },
        { status: 400 }
      );
    }

    const parsed = parseBkashSms(rawSms);
    if (!parsed) {
      return NextResponse.json(
        { error: "SMS message does not match bKash received payment format." },
        { status: 422 }
      );
    }

    const record = recordIncomingBkashTransaction({
      trxId: parsed.trxId,
      senderNumber: parsed.senderNumber,
      amount: parsed.amount,
      ref: parsed.ref,
      rawSms,
    });

    return NextResponse.json({
      success: true,
      message: `Parsed and recorded bKash payment of ৳${parsed.amount} with TrxID ${parsed.trxId}.`,
      transaction: record,
    });
  } catch (error: any) {
    console.error("[bKash SMS Sync API] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to process bKash SMS sync." },
      { status: 500 }
    );
  }
}
