"use server";

import { reassignLeadUseCase } from "@/lib/use-cases/reassign-lead";

export async function reassignLeadAction(leadId: string) {
  return reassignLeadUseCase(leadId);
}
