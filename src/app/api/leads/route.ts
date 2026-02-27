import { NextResponse } from "next/server";
import { getLeadsUseCase } from "@/lib/use-cases/get-leads";

export async function GET() {
  const data = await getLeadsUseCase();
  return NextResponse.json(data);
}
