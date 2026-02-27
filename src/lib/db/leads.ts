import { db } from "@/lib/db";
import { salesAgent, lead } from "@/lib/db/schema";
import { desc, count, sql, eq } from "drizzle-orm";
import type { ProcessingStatus, AIExtractionResult } from "@/lib/types";
import { LeadStatus } from "@/lib/types";

export type CsvLeadRecord = Record<string, string>;

export async function getLeads() {
  const [result, leadsRows] = await Promise.all([
    db
      .select({
        total: count(),
        processed: count(sql`CASE WHEN ${lead.leadStatus} = ${LeadStatus.PROCESSED} THEN 1 END`),
      })
      .from(lead),
    db.query.lead.findMany({
      with: { salesAgent: true },
      orderBy: [desc(lead.meetingDate)],
    }),
  ]);

  const { total, processed } = result[0];
  const leads = leadsRows.map((l) => ({
    ...l,
    meetingDate: l.meetingDate.toISOString(),
    mainPainPoints: l.mainPainPoints ? JSON.parse(l.mainPainPoints) : null,
    integrations: l.integrations ? JSON.parse(l.integrations) : null,
    opportunities: l.opportunities ? JSON.parse(l.opportunities) : null,
  }));

  const status: ProcessingStatus = {
    total,
    processed,
    pending: total - processed,
  };

  return { leads, status };
}

export async function postLeads(records: CsvLeadRecord[]) {
  await db.delete(lead);
  await db.delete(salesAgent);

  const agentNames = [...new Set(records.map((r) => r["Vendedor asignado"]))];
  const agentMap: Record<string, string> = {};

  for (const name of agentNames) {
    const [inserted] = await db
      .insert(salesAgent)
      .values({ name })
      .returning({ id: salesAgent.id });
    agentMap[name] = inserted.id;
  }

  const leadValues = records.map((r) => ({
    salesAgentId: agentMap[r["Vendedor asignado"]],
    name: r["Nombre"],
    email: r["Correo Electronico"],
    phone: r["Numero de Telefono"] || null,
    meetingDate: new Date(r["Fecha de la Reunion"]),
    isClosed: r["closed"] === "1",
    transcript: r["Transcripcion"],
    leadStatus: LeadStatus.UNPROCESSED,
  }));

  await db.insert(lead).values(leadValues);
}

export async function getUnprocessedLeads() {
  return db.query.lead.findMany({
    where: eq(lead.leadStatus, LeadStatus.UNPROCESSED),
  });
}

export async function updateLeadWithInsights(
  leadId: string,
  insights: AIExtractionResult
) {
  await db
    .update(lead)
    .set({
      industry: insights.industry,
      companySize: insights.company_size,
      mainPainPoints: JSON.stringify(insights.main_pain_points),
      discoverySource: insights.discovery_source,
      integrations: JSON.stringify(insights.integrations),
      opportunities: JSON.stringify(insights.opportunities),
      leadScore: insights.lead_score,
      leadStatus: LeadStatus.PROCESSED,
    })
    .where(eq(lead.id, leadId));
}
