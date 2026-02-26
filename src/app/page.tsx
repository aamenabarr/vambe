"use client";

import { Header } from "@/components/header";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { GlobalFilters } from "@/components/filters";
import { KpiCards } from "@/components/kpi-cards";
import { PipelineTab } from "@/components/tabs/pipeline-tab";
import { TeamTab } from "@/components/tabs/team-tab";
import { SegmentationTab } from "@/components/tabs/segmentation-tab";
import { InsightsTab } from "@/components/tabs/insights-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeads } from "@/hooks/use-leads";
import { useFilters } from "@/hooks/use-filters";

export default function Dashboard() {
  const { leads, loading, processingStatus, uploadCSV, isPolling } = useLeads();
  const { filters, setFilters, filteredLeads, availableAgents } = useFilters(leads);

  if (loading && leads.length === 0) {
    return (
      <div className="min-h-screen">
        <Header onUpload={uploadCSV} />
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onUpload={uploadCSV} />

      <main className="mx-auto max-w-[1600px] px-6 py-6 space-y-6">
        <GlobalFilters
          filters={filters}
          setFilters={setFilters}
          availableAgents={availableAgents}
          leads={leads}
        />

        <KpiCards filteredLeads={filteredLeads} allLeads={leads} processingStatus={processingStatus} isPolling={isPolling} />

        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="segmentation">Segmentación</TabsTrigger>
            <TabsTrigger value="insights">Insights IA</TabsTrigger>
          </TabsList>
          <TabsContent value="pipeline" className="mt-4">
            <PipelineTab leads={filteredLeads} />
          </TabsContent>
          <TabsContent value="team" className="mt-4">
            <TeamTab leads={filteredLeads} />
          </TabsContent>
          <TabsContent value="segmentation" className="mt-4">
            <SegmentationTab leads={filteredLeads} />
          </TabsContent>
          <TabsContent value="insights" className="mt-4">
            <InsightsTab leads={filteredLeads} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
