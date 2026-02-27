import { getLeads } from "@/lib/db/leads";

export async function getLeadsUseCase() {
  return getLeads();
}
