import { TechnologicalMaturity } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithRelations {
  meetingId: string
  technologicalMaturity: string
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getTechMaturityVsClosuresUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  const techValues = Object.values(TechnologicalMaturity).filter(
    (v) => v !== TechnologicalMaturity.UNDEFINED,
  )

  return techValues.map((tech) => {
    const techAnalyses = analyses.filter((a) => a.technologicalMaturity === tech)
    const closed = techAnalyses.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length
    const notClosed = techAnalyses.length - closed

    return {
      tech,
      closed,
      notClosed,
      total: techAnalyses.length,
    }
  })
}
