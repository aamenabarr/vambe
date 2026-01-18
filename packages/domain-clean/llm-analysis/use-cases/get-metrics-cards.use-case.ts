import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

export const getMetricsCardsUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const [averageLeadScore, hotLeadsCount, totalLeads, closedCount, hotLeadsClosed] =
    await Promise.all([
      llmAnalysisRepository.getAverageLeadScore(),
      llmAnalysisRepository.getHotLeadsCount(),
      llmAnalysisRepository.getTotalLeadsCount(),
      meetingRepository.getClosedCount(),
      llmAnalysisRepository.getHotLeadsClosedCount(),
    ])

  const closeRate = totalLeads > 0 ? (closedCount / totalLeads) * 100 : 0
  const hotLeadsCloseRate = hotLeadsCount > 0 ? (hotLeadsClosed / hotLeadsCount) * 100 : 0

  return {
    averageLeadScore: Math.round(averageLeadScore),
    hotLeadsCount,
    totalLeads,
    closeRate: Math.round(closeRate * 10) / 10,
    hotLeadsCloseRate: Math.round(hotLeadsCloseRate * 10) / 10,
  }
}
