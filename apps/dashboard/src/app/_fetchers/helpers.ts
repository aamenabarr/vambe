import { DateRange } from 'domain-clean/enums'

export function getDateRange(dateRange?: string): { from?: string; to?: string } {
  if (!dateRange || dateRange === DateRange.ALL) {
    return {}
  }

  const now = new Date()
  const to = now.toISOString()

  if (dateRange === DateRange.LAST_7_DAYS) {
    const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    return { from, to }
  }

  if (dateRange === DateRange.LAST_30_DAYS) {
    const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

    return { from, to }
  }

  if (dateRange === DateRange.LAST_90_DAYS) {
    const from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString()

    return { from, to }
  }

  return {}
}
