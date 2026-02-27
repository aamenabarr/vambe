import { NextResponse } from "next/server";
import { after } from "next/server";
import { processLeadsUseCase } from "@/lib/use-cases/process-leads";

export const maxDuration = 60;

export async function POST() {
  after(() => processLeadsUseCase());
  return NextResponse.json({ status: "started" });
}
