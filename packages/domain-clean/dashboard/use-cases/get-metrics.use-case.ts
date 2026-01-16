import {
  Industry,
  TechnologicalMaturity,
  CustomerPain,
} from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getMetricsUseCase = async (filters: DashboardFilters) => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const [llmAnalyses, meetings] = await Promise.all([
    llmAnalysisRepository.findWithFilters(filters),
    meetingRepository.findWithFilters({
      sellerId: filters.sellerId,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    }),
  ])

    const totalMeetings = meetings.length
    const closedMeetings = meetings.filter((m) => m.closed).length
    const closeRate = totalMeetings > 0 ? (closedMeetings / totalMeetings) * 100 : 0

    const previousMonthDate = new Date()
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1)
    const previousMonthMeetings = meetings.filter(
      (m) =>
        new Date(m.date) >= new Date(previousMonthDate.setDate(1)) && new Date(m.date) < new Date(),
    )
    const previousMonthClosed = previousMonthMeetings.filter((m) => m.closed).length
    const previousMonthTotal = previousMonthMeetings.length
    const previousMonthCloseRate =
      previousMonthTotal > 0 ? (previousMonthClosed / previousMonthTotal) * 100 : 0
    const closeRateChange = closeRate - previousMonthCloseRate

    const hotLeads = llmAnalyses.filter((item) => item.llmAnalysis.leadScore >= 80).length
    const previousHotLeads = 0
    const hotLeadsChange = hotLeads - previousHotLeads

    const totalPotentialValue = llmAnalyses.reduce((sum, item) => {
      const baseValue = item.llmAnalysis.leadScore * 1000
      
      return sum + baseValue
    }, 0)

    const previousTotalValue = 0
    const valueChange = totalPotentialValue - previousTotalValue
    const valueChangePercent = previousTotalValue > 0 ? (valueChange / previousTotalValue) * 100 : 0

    const revenueAtRisk = llmAnalyses
      .filter((item) => item.llmAnalysis.customerPains.includes(CustomerPain.LACK_OF_AUTOMATION))
      .reduce((sum, item) => {
        const baseValue = item.llmAnalysis.leadScore * 1000

        return sum + baseValue
      }, 0)

    const previousRevenueAtRisk = 0
    const revenueAtRiskChange = revenueAtRisk - previousRevenueAtRisk
    const revenueAtRiskChangePercent =
      previousRevenueAtRisk > 0 ? (revenueAtRiskChange / previousRevenueAtRisk) * 100 : 0

  return {
    closeRate: {
      value: closeRate,
      change: closeRateChange,
      changePercent:
        previousMonthCloseRate > 0 ? (closeRateChange / previousMonthCloseRate) * 100 : 0,
    },
    totalPotentialValue: {
      value: totalPotentialValue,
      change: valueChange,
      changePercent: valueChangePercent,
    },
    revenueAtRisk: {
      value: revenueAtRisk,
      change: revenueAtRiskChange,
      changePercent: revenueAtRiskChangePercent,
    },
    hotLeads: {
      value: hotLeads,
      change: hotLeadsChange,
    },
  }
}
