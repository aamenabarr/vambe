import { BuyerSentiment } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithRelations {
  meetingId: string
  buyerSentiment: string
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getBuyerSentimentVsClosuresUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  const sentimentValues = Object.values(BuyerSentiment).filter(
    (v) => v !== BuyerSentiment.UNDEFINED,
  )

  return sentimentValues.map((sentiment) => {
    const sentimentAnalyses = analyses.filter((a) => a.buyerSentiment === sentiment)
    const closed = sentimentAnalyses.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length
    const notClosed = sentimentAnalyses.length - closed

    return {
      sentiment,
      closed,
      notClosed,
      total: sentimentAnalyses.length,
    }
  })
}
