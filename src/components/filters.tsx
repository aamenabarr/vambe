"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Filters } from "@/hooks/use-filters";
import type { Lead, LeadScore } from "@/lib/types";
import { LEAD_SCORE_LABELS } from "@/lib/translations";

interface FiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  availableAgents: string[];
  leads: Lead[];
}

export function GlobalFilters({ filters, setFilters, availableAgents, leads }: FiltersProps) {
  const availableYears = useMemo(() => {
    const years = new Set(leads.map((l) => new Date(l.meetingDate).getFullYear()));
    return Array.from(years).sort((a, b) => b - a);
  }, [leads]);

  const toggleAgent = (agent: string) => {
    setFilters((prev) => ({
      ...prev,
      agents: prev.agents.includes(agent)
        ? prev.agents.filter((a) => a !== agent)
        : [...prev.agents, agent],
    }));
  };

  const toggleScore = (score: LeadScore) => {
    setFilters((prev) => ({
      ...prev,
      scores: prev.scores.includes(score)
        ? prev.scores.filter((s) => s !== score)
        : [...prev.scores, score],
    }));
  };

  const toggleClosed = (status: "closed" | "open") => {
    setFilters((prev) => ({
      ...prev,
      closedStatus: prev.closedStatus.includes(status)
        ? prev.closedStatus.filter((s) => s !== status)
        : [...prev.closedStatus, status],
    }));
  };

  const hasActiveFilters =
    filters.agents.length > 0 ||
    filters.scores.length > 0 ||
    filters.closedStatus.length > 0 ||
    filters.year !== null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Año:</span>
        <Select
          value={filters.year?.toString() || "all"}
          onValueChange={(v) =>
            setFilters((prev) => ({ ...prev, year: v === "all" ? null : Number(v) }))
          }
        >
          <SelectTrigger className="w-[100px] h-8 text-xs bg-white/5 border-white/15">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {availableYears.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-6 w-px bg-white/10" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Vendedor:</span>
        <div className="flex flex-wrap gap-1">
          {availableAgents.map((agent) => (
            <Badge
              key={agent}
              variant={filters.agents.includes(agent) ? "default" : "outline"}
              className={`cursor-pointer text-xs ${
                filters.agents.includes(agent)
                  ? "bg-primary text-primary-foreground"
                  : "border-white/20 hover:bg-white/10"
              }`}
              onClick={() => toggleAgent(agent)}
            >
              {agent}
            </Badge>
          ))}
        </div>
      </div>

      <div className="h-6 w-px bg-white/10" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Score:</span>
        <div className="flex gap-1">
          {(["HOT", "WARM", "COLD"] as LeadScore[]).map((score) => (
            <Badge
              key={score}
              variant={filters.scores.includes(score) ? "default" : "outline"}
              className={`cursor-pointer text-xs ${
                filters.scores.includes(score)
                  ? score === "HOT"
                    ? "bg-green-600 text-white"
                    : score === "WARM"
                    ? "bg-yellow-600 text-white"
                    : "bg-blue-600 text-white"
                  : "border-white/20 hover:bg-white/10"
              }`}
              onClick={() => toggleScore(score)}
            >
              {LEAD_SCORE_LABELS[score]}
            </Badge>
          ))}
        </div>
      </div>

      <div className="h-6 w-px bg-white/10" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Estado:</span>
        <div className="flex gap-1">
          {([
            { key: "closed" as const, label: "Cerrado" },
            { key: "open" as const, label: "Abierto" },
          ]).map(({ key, label }) => (
            <Badge
              key={key}
              variant={filters.closedStatus.includes(key) ? "default" : "outline"}
              className={`cursor-pointer text-xs ${
                filters.closedStatus.includes(key)
                  ? "bg-primary text-primary-foreground"
                  : "border-white/20 hover:bg-white/10"
              }`}
              onClick={() => toggleClosed(key)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <div className="h-6 w-px bg-white/10" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setFilters({
                year: null,
                agents: [],
                scores: [],
                closedStatus: [],
              })
            }
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Limpiar filtros
          </Button>
        </>
      )}
    </div>
  );
}
