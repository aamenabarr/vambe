import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { lead } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { extractLeadInsights } from "@/lib/openai";

let isProcessing = false;

async function processLeads() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const unprocessed = await db.query.lead.findMany({
      where: eq(lead.leadStatus, "UNPROCESSED"),
    });

    const BATCH_SIZE = 20;
    for (let i = 0; i < unprocessed.length; i += BATCH_SIZE) {
      const batch = unprocessed.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (l) => {
          try {
            const result = await extractLeadInsights(l.transcript);
            await db
              .update(lead)
              .set({
                industry: result.industry,
                companySize: result.company_size,
                mainPainPoints: JSON.stringify(result.main_pain_points),
                discoverySource: result.discovery_source,
                integrations: JSON.stringify(result.integrations),
                opportunities: JSON.stringify(result.opportunities),
                leadScore: result.lead_score,
                leadStatus: "PROCESSED",
              })
              .where(eq(lead.id, l.id));
          } catch (err) {
            console.error(`Failed to process lead ${l.id}:`, err);
          }
        })
      );
    }
  } finally {
    isProcessing = false;
  }
}

export async function POST() {
  if (isProcessing) {
    return NextResponse.json({ status: "already_running" });
  }

  processLeads();

  return NextResponse.json({ status: "started" });
}
