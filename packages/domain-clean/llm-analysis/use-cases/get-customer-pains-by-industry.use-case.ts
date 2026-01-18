import { CustomerPain } from 'domain-clean/enums'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'

interface AnalysisWithPains {
  industry: string
  customerPains: string[]
}

export const getCustomerPainsByIndustryUseCase = async () => {
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const analyses = (await llmAnalysisRepository.findAllWithRelations()) as AnalysisWithPains[]
  const industryData = await llmAnalysisRepository.getDataByIndustry()
  const painsData = await llmAnalysisRepository.getCustomerPainsFrequency()

  const industries = industryData.map((i) => i.industry)
  const pains = painsData.map((p) => p.pain)

  return industries.map((industry) => {
    const industryAnalyses = analyses.filter((a) => a.industry === industry)

    const painFrequency = pains.map((pain) => {
      const frequency = industryAnalyses.filter((a) =>
        a.customerPains.includes(pain as CustomerPain),
      ).length

      return {
        pain,
        frequency,
      }
    })

    return {
      industry,
      pains: painFrequency,
    }
  })
}
