import { BuyerSentiment, TechnologicalMaturity } from 'domain-clean/enums'
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
  buyerSentiment: string
  technologicalMaturity: string
}

export const getSalesAgentSpecializationUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()
  const meetingRepository = new MeetingRepository()
  const salesAgentRepository = new SalesAgentRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]
  const meetings = (await meetingRepository.findAllWithRelations()) as MeetingWithRelations[]
  const salesAgents = await salesAgentRepository.findAll()

  const buyerSentimentValues = Object.values(BuyerSentiment).filter(
    (v) => v !== BuyerSentiment.UNDEFINED,
  )
  const techMaturityValues = Object.values(TechnologicalMaturity).filter(
    (v) => v !== TechnologicalMaturity.UNDEFINED,
  )

  const buyerSentimentData = salesAgents.map((agent) => {
    const agentMeetings = meetings.filter((m) => m.salesAgentId === agent.id)
    const agentAnalysisIds = new Set(agentMeetings.map((m) => m.id))
    const agentAnalyses = analyses.filter((a) => agentAnalysisIds.has(a.meetingId))

    const closedBySentiment = buyerSentimentValues.map((sentiment) => {
      const sentimentAnalyses = agentAnalyses.filter((a) => a.buyerSentiment === sentiment)

      const closed = sentimentAnalyses.filter((a) => {
        const meeting = agentMeetings.find((m) => m.id === a.meetingId)

        return meeting?.closed || false
      }).length
      const total = sentimentAnalyses.length
      const closeRate = total > 0 ? (closed / total) * 100 : 0

      return {
        sentiment,
        closeRate: Math.round(closeRate * 10) / 10,
        total,
        closed,
      }
    })

    return {
      salesAgentName: agent.name,
      data: closedBySentiment,
    }
  })

  const techMaturityData = salesAgents.map((agent) => {
    const agentMeetings = meetings.filter((m) => m.salesAgentId === agent.id)
    const agentAnalysisIds = new Set(agentMeetings.map((m) => m.id))
    const agentAnalyses = analyses.filter((a) => agentAnalysisIds.has(a.meetingId))

    const closedByTech = techMaturityValues.map((tech) => {
      const techAnalyses = agentAnalyses.filter((a) => a.technologicalMaturity === tech)

      const closed = techAnalyses.filter((a) => {
        const meeting = agentMeetings.find((m) => m.id === a.meetingId)

        return meeting?.closed || false
      }).length
      const total = techAnalyses.length
      const closeRate = total > 0 ? (closed / total) * 100 : 0

      return {
        tech,
        closeRate: Math.round(closeRate * 10) / 10,
        total,
        closed,
      }
    })

    return {
      salesAgentName: agent.name,
      data: closedByTech,
    }
  })

  return {
    buyerSentiment: buyerSentimentData,
    techMaturity: techMaturityData,
  }
}
