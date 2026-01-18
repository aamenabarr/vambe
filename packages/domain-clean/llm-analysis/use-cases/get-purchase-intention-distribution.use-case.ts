import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithRelations {
  meetingId: string
  purchaseIntention: string
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getPurchaseIntentionDistributionUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const intentionData = await llmAnalysisRepository.getDataByPurchaseIntention()
  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  return intentionData.map((item) => {
    const intentionAnalyses = analyses.filter((a) => a.purchaseIntention === item.intention)
    const closed = intentionAnalyses.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length

    const total = item.total
    const closeRate = total > 0 ? (closed / total) * 100 : 0

    return {
      intention: item.intention,
      total,
      closed,
      closeRate: Math.round(closeRate * 10) / 10,
    }
  })
}
