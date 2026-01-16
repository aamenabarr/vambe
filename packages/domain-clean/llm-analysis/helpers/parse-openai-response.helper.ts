import {
  VambeDiscoverySource,
  BuyerSentiment,
  CustomerPain,
  Industry,
  PurchaseIntention,
  PurchaseObjection,
  TechnologicalMaturity,
} from '../../enums'

export interface ParsedOpenAIResponse {
  leadScore: number
  purchaseIntention: PurchaseIntention
  technologicalMaturity: TechnologicalMaturity
  vambeDiscoverySource: VambeDiscoverySource
  buyerSentiment: BuyerSentiment
  customerPains: CustomerPain[]
  purchaseObjections: PurchaseObjection[]
  industry: Industry
}

export const parseOpenAIResponse = (
  response: string,
): ParsedOpenAIResponse => {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No se encontró JSON en la respuesta')
    }

    const parsed = JSON.parse(jsonMatch[0])

    const customerPains = Array.isArray(parsed.customerPains)
      ? parsed.customerPains.map((p: string) => p.toUpperCase() as CustomerPain)
      : []

    const purchaseObjections = Array.isArray(parsed.purchaseObjections)
      ? parsed.purchaseObjections.map(
          (o: string) => o.toUpperCase() as PurchaseObjection,
        )
      : []

    return {
      leadScore: parseInt(parsed.leadScore, 10) || 0,
      purchaseIntention:
        (parsed.purchaseIntention?.toUpperCase() as PurchaseIntention) ||
        PurchaseIntention.LOW,
      technologicalMaturity:
        (parsed.technologicalMaturity?.toUpperCase() as TechnologicalMaturity) ||
        TechnologicalMaturity.UNDEFINED,
      vambeDiscoverySource:
        (parsed.vambeDiscoverySource?.toUpperCase() as VambeDiscoverySource) ||
        VambeDiscoverySource.UNDEFINED,
      buyerSentiment:
        (parsed.buyerSentiment?.toUpperCase() as BuyerSentiment) ||
        BuyerSentiment.UNDEFINED,
      customerPains: customerPains.filter((p: CustomerPain) =>
        Object.values(CustomerPain).includes(p),
      ) as CustomerPain[],
      purchaseObjections: purchaseObjections.filter((o: PurchaseObjection) =>
        Object.values(PurchaseObjection).includes(o),
      ) as PurchaseObjection[],
      industry:
        (parsed.industry?.toUpperCase() as Industry) || Industry.UNDEFINED,
    }
  } catch (error) {
    throw new Error(
      `Error al parsear respuesta de OpenAI: ${error instanceof Error ? error.message : 'Error desconocido'}`,
    )
  }
}
