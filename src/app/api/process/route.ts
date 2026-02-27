import { NextResponse } from "next/server";
import { processLeadsUseCase } from "@/lib/use-cases/process-leads";

export async function POST() {
  processLeadsUseCase();
  return NextResponse.json({ status: "started" });
}
