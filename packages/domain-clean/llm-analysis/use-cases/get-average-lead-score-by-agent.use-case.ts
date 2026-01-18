import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'
import { SalesAgentRepository } from 'repositories/sales-agent.repository'

interface MeetingWithRelations {
  id: string
  salesAgentId: string
}

interface AnalysisWithRelations {
  meetingId: string
  leadScore: number
}

export const getAverageLeadScoreByAgentUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()
  const salesAgentRepository = new SalesAgentRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithRelations[]
  const salesAgents = await salesAgentRepository.findAll()

  return salesAgents.map((agent) => {
    const agentMeetings = meetings.filter((m) => m.salesAgentId === agent.id)
    const agentAnalysisIds = new Set(agentMeetings.map((m) => m.id))
    const agentAnalyses = analyses.filter((a) => agentAnalysisIds.has(a.meetingId))

    const avgScore =
      agentAnalyses.length > 0
        ? agentAnalyses.reduce((sum, a) => sum + a.leadScore, 0) / agentAnalyses.length
        : 0

    return {
      salesAgentName: agent.name,
      averageLeadScore: Math.round(avgScore),
    }
  })
}
