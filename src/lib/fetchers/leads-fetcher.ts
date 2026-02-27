"use client";

import { useQuery } from "@tanstack/react-query";
import type { Lead, ProcessingStatus } from "@/lib/types";

type LeadsResponse = { leads: Lead[]; status: ProcessingStatus };

async function fetchLeads(): Promise<LeadsResponse> {
  const res = await fetch("/api/leads");
  return res.json();
}

export function useLeadsFetcher() {
  const query = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
    refetchInterval: (query) =>
      (query.state.data?.status?.pending ?? 0) > 0 ? 3000 : false,
  });

  const leads = query.data?.leads ?? [];
  const loading = query.isPending && leads.length === 0;
  const processingStatus = query.data?.status ?? null;
  const isPolling = (processingStatus?.pending ?? 0) > 0;

  return { leads, loading, processingStatus, isPolling };
}
