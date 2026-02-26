import type { Lead } from "./types";

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = key(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

function countBy<T>(arr: T[], key: (item: T) => string): { name: string; value: number }[] {
  const map: Record<string, number> = {};
  arr.forEach((item) => {
    const k = key(item);
    map[k] = (map[k] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function flatCount(arr: (string[] | null)[]): { name: string; value: number }[] {
  const map: Record<string, number> = {};
  arr.forEach((items) => {
    if (!items) return;
    items.forEach((item) => {
      map[item] = (map[item] || 0) + 1;
    });
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getKpiMetrics(filtered: Lead[], all: Lead[]) {
  const total = filtered.length;
  const closed = filtered.filter((l) => l.isClosed).length;
  const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0;
  const hotLeads = filtered.filter((l) => l.leadScore === "HOT").length;
  const processed = all.filter((l) => l.leadStatus === "PROCESSED").length;

  return { total, closed, conversionRate, hotLeads, processed, totalAll: all.length };
}

export function getLeadsByMonth(leads: Lead[]) {
  const grouped = groupBy(leads, (l) => {
    const d = new Date(l.meetingDate);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, items]) => {
      const [year, m] = month.split("-");
      const date = new Date(Number(year), Number(m) - 1);
      const label = date.toLocaleDateString("es-CL", { month: "short", year: "numeric" });
      return {
        month: label,
        total: items.length,
        cerrados: items.filter((l) => l.isClosed).length,
      };
    });
}

export function getConversionByMonth(leads: Lead[]) {
  const grouped = groupBy(leads, (l) => {
    const d = new Date(l.meetingDate);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, items]) => {
      const [year, m] = month.split("-");
      const date = new Date(Number(year), Number(m) - 1);
      const label = date.toLocaleDateString("es-CL", { month: "short", year: "numeric" });
      const closed = items.filter((l) => l.isClosed).length;
      return {
        month: label,
        tasa: items.length > 0 ? Math.round((closed / items.length) * 100) : 0,
      };
    });
}

export function getLeadScoreDistribution(leads: Lead[]) {
  return countBy(
    leads.filter((l) => l.leadScore),
    (l) => l.leadScore!
  );
}

export function getLeadsByAgent(leads: Lead[]) {
  return countBy(leads, (l) => l.salesAgent.name);
}

export function getConversionByAgent(leads: Lead[]) {
  const grouped = groupBy(leads, (l) => l.salesAgent.name);
  return Object.entries(grouped).map(([name, items]) => {
    const closed = items.filter((l) => l.isClosed).length;
    return {
      name,
      tasa: items.length > 0 ? Math.round((closed / items.length) * 100) : 0,
    };
  });
}

export function getScoreByAgent(leads: Lead[]) {
  const grouped = groupBy(leads, (l) => l.salesAgent.name);
  return Object.entries(grouped).map(([name, items]) => ({
    name,
    HOT: items.filter((l) => l.leadScore === "HOT").length,
    WARM: items.filter((l) => l.leadScore === "WARM").length,
    COLD: items.filter((l) => l.leadScore === "COLD").length,
  }));
}

export function getAgentSummary(leads: Lead[]) {
  const grouped = groupBy(leads, (l) => l.salesAgent.name);
  return Object.entries(grouped)
    .map(([name, items]) => {
      const closed = items.filter((l) => l.isClosed).length;
      return {
        name,
        total: items.length,
        closed,
        conversionRate: items.length > 0 ? Math.round((closed / items.length) * 100) : 0,
        hot: items.filter((l) => l.leadScore === "HOT").length,
        warm: items.filter((l) => l.leadScore === "WARM").length,
        cold: items.filter((l) => l.leadScore === "COLD").length,
      };
    })
    .sort((a, b) => b.conversionRate - a.conversionRate);
}

export function getLeadsByIndustry(leads: Lead[]) {
  return countBy(
    leads.filter((l) => l.industry),
    (l) => l.industry!
  );
}

export function getCompanySizeDistribution(leads: Lead[]) {
  return countBy(
    leads.filter((l) => l.companySize),
    (l) => l.companySize!
  );
}

export function getDiscoverySourceDistribution(leads: Lead[]) {
  return countBy(
    leads.filter((l) => l.discoverySource),
    (l) => l.discoverySource!
  );
}

export function getConversionByIndustry(leads: Lead[]) {
  const grouped = groupBy(
    leads.filter((l) => l.industry),
    (l) => l.industry!
  );
  return Object.entries(grouped)
    .map(([name, items]) => {
      const closed = items.filter((l) => l.isClosed).length;
      return {
        name,
        tasa: items.length > 0 ? Math.round((closed / items.length) * 100) : 0,
      };
    })
    .sort((a, b) => b.tasa - a.tasa);
}

export function getTopPainPoints(leads: Lead[]) {
  return flatCount(leads.map((l) => l.mainPainPoints));
}

export function getTopOpportunities(leads: Lead[]) {
  return flatCount(leads.map((l) => l.opportunities));
}

export function getTopIntegrations(leads: Lead[]) {
  return flatCount(leads.map((l) => l.integrations));
}

export function getConversionByScore(leads: Lead[]) {
  const grouped = groupBy(
    leads.filter((l) => l.leadScore),
    (l) => l.leadScore!
  );
  return Object.entries(grouped).map(([name, items]) => ({
    name,
    total: items.length,
    cerrados: items.filter((l) => l.isClosed).length,
  }));
}
