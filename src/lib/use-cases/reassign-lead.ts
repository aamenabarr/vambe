import { getLeads, updateLeadSalesAgent } from "@/lib/db/leads";
import { getVendorDataForReassignment } from "@/lib/metrics";
import { reassignLeadWithLLM } from "@/lib/llm/openai";

export async function reassignLeadUseCase(leadId: string) {
  const { leads: allLeads } = await getLeads();
  const lead = allLeads.find((l) => l.id === leadId);
  if (!lead) return { success: false, error: "Lead no encontrada" };
  const vendorData = getVendorDataForReassignment(allLeads, lead);

  if (vendorData.length === 0) return { success: false, error: "No hay vendedores" };
  if (vendorData.length === 1) {
    await updateLeadSalesAgent(leadId, vendorData[0].id);
    return { success: true, vendorId: vendorData[0].id };
  }

  const industryLabel = lead.industry || "Sin datos";
  const sizeLabel = lead.companySize || "Sin datos";
  const vendorsJson = JSON.stringify(
    vendorData.map((v) => ({
      id: v.id,
      name: v.name,
      conversion_industry: v.conversionIndustry,
      conversion_size: v.conversionSize,
      open_leads: v.openLeadsCount,
    })),
    null,
    2
  );
  const message = `Lead: industria=${industryLabel}, tamaño=${sizeLabel}\n\nVendedores:\n${vendorsJson}`;
  const vendorId = await reassignLeadWithLLM(message);
  const validId = vendorData.find((v) => v.id === vendorId)?.id ?? vendorData[0].id;
  await updateLeadSalesAgent(leadId, validId);
  return { success: true, vendorId: validId };
}
