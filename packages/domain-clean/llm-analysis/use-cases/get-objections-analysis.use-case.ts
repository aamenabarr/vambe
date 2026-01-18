import { PurchaseObjection } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'

interface AnalysisWithObjections {
  meetingId: string
  purchaseObjections: string[]
}

interface MeetingWithClosed {
  id: string
  closed: boolean
}

export const getObjectionsAnalysisUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()

  const objectionsFreq = await llmAnalysisRepository.getObjectionsFrequency()
  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithObjections[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithClosed[]

  const meetingMap = new Map(meetings.map((m) => [m.id, m]))

  const objectionsImpact = objectionsFreq.map((item) => {
    const analysesWithObjection = analyses.filter((a) =>
      a.purchaseObjections.includes(item.objection as PurchaseObjection),
    )

    const closed = analysesWithObjection.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length

    const totalWithObjection = analysesWithObjection.length
    const closeRateWith = totalWithObjection > 0 ? (closed / totalWithObjection) * 100 : 0

    const analysesWithoutObjection = analyses.filter(
      (a) => !a.purchaseObjections.includes(item.objection as PurchaseObjection),
    )

    const closedWithout = analysesWithoutObjection.filter((a) => {
      const meeting = meetingMap.get(a.meetingId)

      return meeting?.closed || false
    }).length

    const totalWithoutObjection = analysesWithoutObjection.length
    const closeRateWithout =
      totalWithoutObjection > 0 ? (closedWithout / totalWithoutObjection) * 100 : 0

    const impact = closeRateWithout - closeRateWith

    return {
      objection: item.objection,
      frequency: item.frequency,
      closeRateWith: Math.round(closeRateWith * 10) / 10,
      closeRateWithout: Math.round(closeRateWithout * 10) / 10,
      impact: Math.round(impact * 10) / 10,
    }
  })

  return {
    frequency: objectionsFreq,
    impact: objectionsImpact.sort((a, b) => b.impact - a.impact),
  }
}
