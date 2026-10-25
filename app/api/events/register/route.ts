import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, eventId, eventTitle, teamName, notes } = body;

    if (!name || !email || !eventTitle) {
      return NextResponse.json({ error: "Missing required registration fields" }, { status: 400 });
    }

    const safePrefix = (eventId || "BAUBC").toUpperCase();
    const uniqueSuffix = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8).toUpperCase()
      : Math.floor(100000 + Math.random() * 900000).toString();
    const ticketId = `TICKET-${safePrefix}-${uniqueSuffix}`;
    const timestamp = new Date().toISOString();
    const registrationRecord = {
      ticketId,
      eventId: eventId || "BAUBC",
      eventTitle,
      name,
      email,
      phone: phone || "",
      organization: organization || "",
      teamName: teamName || "",
      notes: notes || "",
      registeredAt: timestamp,
    };

    // Durable persistence to DB/event_registrations.json
    try {
      const fs = await import("fs");
      const path = await import("path");
      const regFile = path.join(process.cwd(), "DB", "event_registrations.json");
      const dir = path.dirname(regFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      let existing: any[] = [];
      if (fs.existsSync(regFile)) {
        try {
          existing = JSON.parse(fs.readFileSync(regFile, "utf-8"));
        } catch {}
      }
      existing.push(registrationRecord);
      fs.writeFileSync(regFile, JSON.stringify(existing, null, 2), "utf-8");
    } catch (saveErr) {
      console.warn("[Event Registration Persist Warning]:", saveErr);
    }

    return NextResponse.json({
      success: true,
      ticketId,
      eventTitle,
      attendee: { name, email },
      message: `Registration confirmed! Your official digital pass ID is ${ticketId}. Save this pass for event entry.`
    });
  } catch (error) {
    console.error("Failed to process event registration API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
