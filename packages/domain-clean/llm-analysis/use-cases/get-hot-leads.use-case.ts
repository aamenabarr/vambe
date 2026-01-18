import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

interface AnalysisWithRelations {
  id: string
  leadScore: number
  buyerSentiment: string
  industry: string
  purchaseIntention: string
  meeting: {
    salesAgent: {
      name: string
    }
    customer: {
      name: string
      email: string
    }
  } | null
}

export interface HotLead {
  id: string
  customerName: string
  customerEmail: string
  salesAgentName: string
  leadScore: number
  status: string
  buyerSentiment: string
  industry: string
  purchaseIntention: string
}

export const getHotLeadsUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithRelations[]

  const hotLeads: HotLead[] = analyses
    .map((analysis) => {
      const meeting = analysis.meeting
      if (!meeting) return null

      const salesAgent = meeting.salesAgent
      const customer = meeting.customer

      let status = 'Frío'
      if (analysis.leadScore >= 86) status = 'Muy Caliente'
      else if (analysis.leadScore >= 61) status = 'Caliente'
      else if (analysis.leadScore >= 31) status = 'Tibio'

      return {
        id: analysis.id,
        customerName: customer?.name || '',
        customerEmail: customer?.email || '',
        salesAgentName: salesAgent?.name || '',
        leadScore: analysis.leadScore,
        status,
        buyerSentiment: analysis.buyerSentiment,
        industry: analysis.industry,
        purchaseIntention: analysis.purchaseIntention,
      }
    })
    .filter((lead): lead is HotLead => lead !== null)
    .sort((a, b) => b.leadScore - a.leadScore)

  return hotLeads
}
