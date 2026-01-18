import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithRelations {
  meetingId: string
  industry: string
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getIndustryClosuresUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  const industryData = await llmAnalysisRepository.getDataByIndustry()

  return industryData.map((item) => {
    const industryAnalyses = analyses.filter((a) => a.industry === item.industry)
    const closed = industryAnalyses.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)
      
      return meeting?.closed || false
    }).length

    const total = item.total
    const closeRate = total > 0 ? (closed / total) * 100 : 0

    return {
      industry: item.industry,
      total,
      closed,
      closeRate: Math.round(closeRate * 10) / 10,
    }
  })
}
