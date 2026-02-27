"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { Industry, type Lead } from "@/lib/types";
import {
  getLeadsByIndustry,
  getCompanySizeDistribution,
  getDiscoverySourceDistribution,
  getConversionByIndustry,
} from "@/lib/metrics";
import { tLabel, COMMON } from "@/lib/translations";

interface SegmentationTabProps {
  leads: Lead[];
}

const COLORS = [
  "#7c3aed", "#3b82f6", "#06b6d4", "#10b981", "#eab308",
  "#f97316", "#ef4444", "#ec4899", "#8b5cf6", "#14b8a6",
  "#f59e0b", "#6366f1", "#84cc16", "#d946ef",
];

const industryConfig: ChartConfig = {
  value: { label: COMMON.leads, color: "var(--chart-1)" },
};

const conversionConfig: ChartConfig = {
  tasa: { label: COMMON.conversionRate, color: "var(--chart-2)" },
};

const sizeConfig: ChartConfig = {
  value: { label: COMMON.leads, color: "var(--chart-1)" },
};

const sourceConfig: ChartConfig = {
  value: { label: COMMON.leads, color: "var(--chart-1)" },
};

export function SegmentationTab({ leads }: SegmentationTabProps) {
  const [industryFilters, setIndustryFilters] = useState<Industry[]>([]);

  const toggleIndustry = (industry: Industry) => {
    setIndustryFilters((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const filteredByIndustry = useMemo(
    () => (industryFilters.length > 0 ? leads.filter((l) => l.industry && industryFilters.includes(l.industry as Industry)) : leads),
    [leads, industryFilters]
  );

  const TAIL: string[] = [Industry.OTHER, Industry.UNKNOWN];
  const allIndustries = getLeadsByIndustry(leads).sort((a, b) => {
    const ai = TAIL.indexOf(a.name);
    const bi = TAIL.indexOf(b.name);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return -1;
    if (bi === -1) return 1;
    return ai - bi;
  });
  const industriesChart = getLeadsByIndustry(filteredByIndustry).map((d) => ({ ...d, name: tLabel(d.name) }));
  const sizeDistribution = getCompanySizeDistribution(filteredByIndustry).map((d) => ({ ...d, name: tLabel(d.name) }));
  const sourceDistribution = getDiscoverySourceDistribution(filteredByIndustry).map((d) => ({ ...d, name: tLabel(d.name) }));
  const conversionByIndustry = getConversionByIndustry(filteredByIndustry).map((d) => ({ ...d, name: tLabel(d.name) }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Filtrar por industria:</span>
        {allIndustries.map((ind) => (
          <Badge
            key={ind.name}
            variant={industryFilters.includes(ind.name as Industry) ? "default" : "outline"}
            className={`cursor-pointer text-xs ${
              industryFilters.includes(ind.name as Industry)
                ? "bg-primary text-primary-foreground"
                : "border-white/20 hover:bg-white/10"
            }`}
            onClick={() => toggleIndustry(ind.name as Industry)}
          >
            {tLabel(ind.name)}
          </Badge>
        ))}
        {industryFilters.length > 0 && (
          <>
            <div className="h-6 w-px bg-white/10" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIndustryFilters([])}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Limpiar filtros
            </Button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Tamaño de Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sizeConfig} className="h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={sizeDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {sizeDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {sizeDistribution.map((s, i) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  {tLabel(s.name)} ({s.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Fuente de Descubrimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sourceConfig} className="h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={sourceDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {sourceDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[(i + 5) % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {sourceDistribution.map((s, i) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[(i + 5) % COLORS.length] }}
                  />
                  {tLabel(s.name)} ({s.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Leads por Industria</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={industryConfig} className="h-[500px] w-full">
              <BarChart data={industriesChart} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Conversión por Industria</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={conversionConfig} className="h-[500px] w-full">
              <BarChart data={conversionByIndustry} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasa" fill="var(--color-tasa)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
