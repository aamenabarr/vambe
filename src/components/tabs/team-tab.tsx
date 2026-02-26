"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { Lead } from "@/lib/types";
import {
  getLeadsByAgent,
  getConversionByAgent,
  getScoreByAgent,
  getAgentSummary,
} from "@/lib/metrics";

interface TeamTabProps {
  leads: Lead[];
}

const leadsConfig: ChartConfig = {
  value: { label: "Leads", color: "var(--chart-1)" },
};

const conversionConfig: ChartConfig = {
  tasa: { label: "Conversión %", color: "var(--chart-2)" },
};

const scoreConfig: ChartConfig = {
  HOT: { label: "Caliente", color: "#22c55e" },
  WARM: { label: "Tibio", color: "#eab308" },
  COLD: { label: "Frío", color: "#3b82f6" },
};

export function TeamTab({ leads }: TeamTabProps) {
  const leadsByAgent = getLeadsByAgent(leads);
  const conversionByAgent = getConversionByAgent(leads);
  const scoreByAgent = getScoreByAgent(leads);
  const summary = getAgentSummary(leads);

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-sm">Resumen por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Cerrados</TableHead>
                <TableHead className="text-right">Conversión</TableHead>
                <TableHead className="text-right">Hot</TableHead>
                <TableHead className="text-right">Warm</TableHead>
                <TableHead className="text-right">Cold</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.map((agent, index) => (
                <motion.tr
                  key={agent.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-white/5 border-b transition-colors"
                >
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell className="text-right">{agent.total}</TableCell>
                  <TableCell className="text-right">{agent.closed}</TableCell>
                  <TableCell className="text-right">{agent.conversionRate}%</TableCell>
                  <TableCell className="text-right text-green-400">{agent.hot}</TableCell>
                  <TableCell className="text-right text-yellow-400">{agent.warm}</TableCell>
                  <TableCell className="text-right text-blue-400">{agent.cold}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Leads por Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadsConfig} className="h-[250px] w-full">
              <BarChart data={leadsByAgent}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Tasa de Conversión por Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={conversionConfig} className="h-[250px] w-full">
              <BarChart data={conversionByAgent}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasa" fill="var(--color-tasa)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-sm">Lead Score por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={scoreConfig} className="h-[250px] w-full">
            <BarChart data={scoreByAgent}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="HOT" stackId="a" fill="var(--color-HOT)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="WARM" stackId="a" fill="var(--color-WARM)" />
              <Bar dataKey="COLD" stackId="a" fill="var(--color-COLD)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
