"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { Lead } from "@/lib/types";
import {
  getTopPainPoints,
  getTopOpportunities,
  getTopIntegrations,
  getConversionByScore,
} from "@/lib/metrics";
import { tLabel, COMMON } from "@/lib/translations";

interface InsightsTabProps {
  leads: Lead[];
}

const painConfig: ChartConfig = {
  value: { label: COMMON.leads, color: "var(--chart-1)" },
};

const oppConfig: ChartConfig = {
  value: { label: COMMON.leads, color: "var(--chart-2)" },
};

const intConfig: ChartConfig = {
  value: { label: COMMON.leads, color: "var(--chart-4)" },
};

const convConfig: ChartConfig = {
  total: { label: COMMON.total, color: "var(--chart-1)" },
  cerrados: { label: COMMON.cerrados, color: "#22c55e" },
};

export function InsightsTab({ leads }: InsightsTabProps) {
  const painPoints = getTopPainPoints(leads).map((d) => ({ ...d, name: tLabel(d.name) }));
  const opportunities = getTopOpportunities(leads).map((d) => ({ ...d, name: tLabel(d.name) }));
  const integrations = getTopIntegrations(leads).map((d) => ({ ...d, name: tLabel(d.name) }));
  const conversionByScore = getConversionByScore(leads).map((d) => ({ ...d, name: tLabel(d.name) }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Top Pain Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={painConfig} className="h-[380px] w-full">
              <BarChart data={painPoints} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={130}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Top Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={oppConfig} className="h-[380px] w-full">
              <BarChart data={opportunities} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={150}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Integraciones Solicitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={intConfig} className="h-[380px] w-full">
              <BarChart data={integrations} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={140}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Conversión por Lead Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={convConfig} className="h-[380px] w-full">
              <BarChart data={conversionByScore}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cerrados" fill="var(--color-cerrados)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
