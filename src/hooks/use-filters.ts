"use client";

import { useState, useMemo } from "react";
import type { Lead, LeadScore } from "@/lib/types";

export interface Filters {
  year: number | null;
  agents: string[];
  scores: LeadScore[];
  closedStatus: ("closed" | "open")[];
}

const DEFAULT_FILTERS: Filters = {
  year: null,
  agents: [],
  scores: [],
  closedStatus: [],
};

export function useFilters(leads: Lead[]) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const availableAgents = useMemo(() => {
    const agents = new Set(leads.map((l) => l.salesAgent.name));
    return Array.from(agents).sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filters.year !== null) {
        const meetingYear = new Date(l.meetingDate).getFullYear();
        if (meetingYear !== filters.year) return false;
      }
      if (filters.agents.length > 0 && !filters.agents.includes(l.salesAgent.name)) {
        return false;
      }
      if (filters.scores.length > 0 && l.leadScore && !filters.scores.includes(l.leadScore)) {
        return false;
      }
      if (filters.closedStatus.length > 0) {
        const isClosed = l.isClosed ? "closed" : "open";
        if (!filters.closedStatus.includes(isClosed)) return false;
      }
      return true;
    });
  }, [leads, filters]);

  return { filters, setFilters, filteredLeads, availableAgents };
}
