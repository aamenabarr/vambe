import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithScore {
  meetingId: string
  leadScore: number
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getLeadScoreVsCloseRateUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithScore[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  const ranges = ['86-100', '61-85', '31-60', '0-30']

  return ranges.map((range) => {
    const [min, max] = range.split('-').map(Number)
    const rangeAnalyses = analyses.filter((a) => a.leadScore >= min && a.leadScore <= max)
    const closed = rangeAnalyses.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length

    const total = rangeAnalyses.length
    const closeRate = total > 0 ? (closed / total) * 100 : 0

    return {
      scoreRange: range,
      total,
      closed,
      closeRate: Math.round(closeRate * 10) / 10,
    }
  })
}
