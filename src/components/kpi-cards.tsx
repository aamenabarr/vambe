"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Lead, ProcessingStatus } from "@/lib/types";
import { getKpiMetrics } from "@/lib/metrics";
import { useCountUp } from "@/hooks/use-count-up";

interface KpiCardsProps {
  filteredLeads: Lead[];
  allLeads: Lead[];
  processingStatus: ProcessingStatus | null;
  isPolling: boolean;
}

export function KpiCards({ filteredLeads, allLeads, processingStatus, isPolling }: KpiCardsProps) {
  const { total, closed, conversionRate, hotLeads, processed, totalAll } =
    getKpiMetrics(filteredLeads, allLeads);

  const isProcessing = isPolling && processingStatus && processed < totalAll;
  const progress =
    processingStatus && processingStatus.total > 0
      ? Math.round((processingStatus.processed / processingStatus.total) * 100)
      : 0;

  const countTotal = useCountUp(total);
  const countConversion = useCountUp(conversionRate);
  const countHot = useCountUp(hotLeads);
  const countProcessed = useCountUp(processed, 800, !isProcessing);
  const countTotalAll = useCountUp(totalAll, 800, !isProcessing);
  const countProcessedLive = useCountUp(
    processingStatus?.processed ?? 0,
    500,
    !!isProcessing,
    true
  );
  const countTotalLive = useCountUp(
    processingStatus?.total ?? 0,
    500,
    !!isProcessing,
    true
  );

  const cards = [
    {
      title: "Total Leads",
      value: countTotal,
      subtitle: `${total - closed} leads abiertos`,
    },
    {
      title: "Tasa de Conversión",
      value: `${countConversion}%`,
      subtitle: `${closed} cerrados de ${total}`,
    },
    {
      title: "Leads Hot",
      value: countHot,
      subtitle: total > 0 ? `${Math.round((hotLeads / total) * 100)}% del total` : "0%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardContent className="pt-2 pb-2">
            <p className="text-sm text-muted-foreground">{card.title}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardContent className="pt-2 pb-2">
          <p className="text-sm text-muted-foreground">Leads Procesados</p>
          <p className="text-3xl font-bold mt-1">
            {isProcessing ? countProcessedLive : countProcessed}/
            {isProcessing ? countTotalLive : countTotalAll}
          </p>
          {isProcessing ? (
            <div className="flex items-center gap-2 mt-1">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              {processed === totalAll ? "Procesamiento completo" : `${totalAll - processed} pendientes`}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
