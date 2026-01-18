import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'
import { SalesAgentRepository } from 'repositories/sales-agent.repository'

interface MeetingWithRelations {
  id: string
  salesAgentId: string
  closed: boolean
}

interface AnalysisWithRelations {
  meetingId: string
  leadScore: number
}

export const getClosuresBySalesAgentUseCase = async () => {
  const meetingRepository = new MeetingRepository()
  const salesAgentRepository = new SalesAgentRepository()
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const closedByAgent = await meetingRepository.getClosedBySalesAgent()
  const salesAgents = await salesAgentRepository.findAll()
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithRelations[]
  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]

  const agentMap = new Map(salesAgents.map((a) => [a.id, a.name]))

  return closedByAgent.map((item) => {
    const agentName = agentMap.get(item.salesAgentId) || ''
    const agentMeetings = meetings.filter((m) => m.salesAgentId === item.salesAgentId)
    const total = agentMeetings.length
    const closed = item.count
    const closeRate = total > 0 ? (closed / total) * 100 : 0

    const agentAnalyses = analyses.filter((a) => agentMeetings.some((m) => m.id === a.meetingId))
    const avgScore =
      agentAnalyses.length > 0
        ? agentAnalyses.reduce((sum, a) => sum + a.leadScore, 0) / agentAnalyses.length
        : 0

    return {
      salesAgentName: agentName,
      closed,
      total,
      closeRate: Math.round(closeRate * 10) / 10,
      averageLeadScore: Math.round(avgScore),
    }
  })
}
