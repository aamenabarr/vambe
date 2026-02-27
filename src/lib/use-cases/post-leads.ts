import { postLeads, type CsvLeadRecord } from "@/lib/db/leads";

export async function postLeadsUseCase(records: CsvLeadRecord[]) {
  await postLeads(records);
}
