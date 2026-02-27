"use server";

import { parse } from "csv-parse/sync";
import { postLeadsUseCase } from "@/lib/use-cases/post-leads";
import { processLeadsUseCase } from "@/lib/use-cases/process-leads";

export async function uploadCSVAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  const text = await file.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  await postLeadsUseCase(records);
  processLeadsUseCase();
}
