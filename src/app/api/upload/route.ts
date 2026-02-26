import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { salesAgent, lead } from "@/lib/db/schema";
import { parse } from "csv-parse/sync";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text();
    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    await db.delete(lead);
    await db.delete(salesAgent);

    const typedRecords = records as Record<string, string>[];
    const agentNames = [...new Set(typedRecords.map((r) => r["Vendedor asignado"]))] as string[];
    const agentMap: Record<string, string> = {};

    for (const name of agentNames) {
      const [inserted] = await db
        .insert(salesAgent)
        .values({ name })
        .returning({ id: salesAgent.id });
      agentMap[name] = inserted.id;
    }

    const leadValues = typedRecords.map((r) => ({
      salesAgentId: agentMap[r["Vendedor asignado"]],
      name: r["Nombre"],
      email: r["Correo Electronico"],
      phone: r["Numero de Telefono"] || null,
      meetingDate: new Date(r["Fecha de la Reunion"]),
      isClosed: r["closed"] === "1",
      transcript: r["Transcripcion"],
      leadStatus: "UNPROCESSED" as const,
    }));

    await db.insert(lead).values(leadValues);

    return NextResponse.json({
      inserted: leadValues.length,
      agents: agentNames.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process CSV" },
      { status: 500 }
    );
  }
}
