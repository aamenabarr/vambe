import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithRelations {
  meetingId: string
  vambeDiscoverySource: string
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getDiscoverySourcesUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const sourceData = await llmAnalysisRepository.getDataByDiscoverySource()
  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  return sourceData.map((item) => {
    const sourceAnalyses = analyses.filter((a) => a.vambeDiscoverySource === item.source)
    const closed = sourceAnalyses.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length

    const total = item.total
    const closeRate = total > 0 ? (closed / total) * 100 : 0

    return {
      source: item.source,
      total,
      closed,
      closeRate: Math.round(closeRate * 10) / 10,
    }
  })
}
