import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { lead } from "@/lib/db/schema";
import { desc, count, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusOnly = searchParams.get("status");

  if (statusOnly === "true") {
    const result = await db
      .select({
        total: count(),
        processed: count(sql`CASE WHEN ${lead.leadStatus} = 'PROCESSED' THEN 1 END`),
      })
      .from(lead);

    const { total, processed } = result[0];
    return NextResponse.json({
      total,
      processed,
      pending: total - processed,
    });
  }

  const leads = await db.query.lead.findMany({
    with: { salesAgent: true },
    orderBy: [desc(lead.meetingDate)],
  });

  const parsed = leads.map((l) => ({
    ...l,
    meetingDate: l.meetingDate.toISOString(),
    mainPainPoints: l.mainPainPoints ? JSON.parse(l.mainPainPoints) : null,
    integrations: l.integrations ? JSON.parse(l.integrations) : null,
    opportunities: l.opportunities ? JSON.parse(l.opportunities) : null,
  }));

  return NextResponse.json(parsed);
}
