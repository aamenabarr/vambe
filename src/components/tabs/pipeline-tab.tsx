"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { LeadDetailModal } from "@/components/lead-detail-modal";
import type { Lead } from "@/lib/types";
import {
  getLeadsByMonth,
  getConversionByMonth,
  getLeadScoreDistribution,
} from "@/lib/metrics";
import { tLabel } from "@/lib/translations";

interface PipelineTabProps {
  leads: Lead[];
}

const areaConfig: ChartConfig = {
  total: { label: "Total", color: "var(--chart-1)" },
  cerrados: { label: "Cerrados", color: "var(--chart-2)" },
};

const barConfig: ChartConfig = {
  tasa: { label: "Conversión %", color: "var(--chart-1)" },
};

const SCORE_COLORS: Record<string, string> = {
  Caliente: "#22c55e",
  Tibio: "#eab308",
  Frío: "#3b82f6",
  Otro: "#6b7280",
  Desconocido: "#374151",
};

const scoreConfig: ChartConfig = {
  Caliente: { label: "Caliente", color: SCORE_COLORS.Caliente },
  Tibio: { label: "Tibio", color: SCORE_COLORS.Tibio },
  Frío: { label: "Frío", color: SCORE_COLORS.Frío },
};

const scoreBadgeColors: Record<string, string> = {
  HOT: "bg-green-500/20 text-green-400",
  WARM: "bg-yellow-500/20 text-yellow-400",
  COLD: "bg-blue-500/20 text-blue-400",
};

const PAGE_SIZE = 10;

export function PipelineTab({ leads }: PipelineTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const monthlyLeads = getLeadsByMonth(leads);
  const conversionByMonth = getConversionByMonth(leads);
  const scoreDistribution = getLeadScoreDistribution(leads).map((d) => ({ ...d, name: tLabel(d.name) }));

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Leads por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={areaConfig} className="h-[250px] w-full">
              <AreaChart data={monthlyLeads}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-35} textAnchor="end" height={50} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="total"
                  fill="var(--color-total)"
                  fillOpacity={0.3}
                  stroke="var(--color-total)"
                />
                <Area
                  type="monotone"
                  dataKey="cerrados"
                  fill="var(--color-cerrados)"
                  fillOpacity={0.3}
                  stroke="var(--color-cerrados)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Lead Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={scoreConfig} className="h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={scoreDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {scoreDistribution.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={SCORE_COLORS[entry.name] || SCORE_COLORS.OTHER}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-2">
              {scoreDistribution.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: SCORE_COLORS[s.name] || SCORE_COLORS.OTHER }}
                  />
                  {s.name} ({s.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-sm">Conversión por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barConfig} className="h-[200px] w-full">
            <BarChart data={conversionByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="tasa" fill="var(--color-tasa)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Listado de Leads</CardTitle>
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="max-w-xs h-8 text-xs bg-black/20 border-white/10"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="w-[15%]">Nombre</TableHead>
                <TableHead className="w-[20%]">Email</TableHead>
                <TableHead className="w-[15%]">Industria</TableHead>
                <TableHead className="w-[15%]">Vendedor</TableHead>
                <TableHead className="w-[10%]">Score</TableHead>
                <TableHead className="w-[10%]">Estado</TableHead>
                <TableHead className="w-[10%]">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((l) => (
                <TableRow
                  key={l.id}
                  className="border-white/5 cursor-pointer hover:bg-white/5"
                  onClick={() => setSelectedLead(l)}
                >
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell className="text-muted-foreground">{l.email}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {l.industry ? tLabel(l.industry) : "—"}
                  </TableCell>
                  <TableCell>{l.salesAgent.name}</TableCell>
                  <TableCell>
                    {l.leadScore ? (
                      <Badge className={scoreBadgeColors[l.leadScore] || ""}>
                        {tLabel(l.leadScore)}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={l.isClosed ? "default" : "secondary"}>
                      {l.isClosed ? "Cerrado" : "Abierto"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(l.meetingDate).toLocaleDateString("es-CL")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-muted-foreground">
                {filtered.length} leads
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="text-xs border-white/20"
                >
                  Anterior
                </Button>
                <span className="flex items-center px-2 text-xs text-muted-foreground">
                  {page + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="text-xs border-white/20"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <LeadDetailModal
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
