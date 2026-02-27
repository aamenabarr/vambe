import { getUnprocessedLeads, updateLeadWithInsights } from "@/lib/db/leads";
import { extractLeadInsights } from "@/lib/llm/openai";

let isProcessing = false;

export async function processLeadsUseCase() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const unprocessed = await getUnprocessedLeads();
    const BATCH_SIZE = 20;

    for (let i = 0; i < unprocessed.length; i += BATCH_SIZE) {
      const batch = unprocessed.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (l) => {
          try {
            const result = await extractLeadInsights(l.transcript);
            await updateLeadWithInsights(l.id, result);
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
