import { BuyerSentiment } from 'domain-clean/enums'

export const buyerSentimentTranslation: Record<BuyerSentiment, string> = {
  [BuyerSentiment.UNDEFINED]: 'Indefinido',
  [BuyerSentiment.CONFIDENT]: 'Confiado',
  [BuyerSentiment.NEUTRAL]: 'Neutral',
  [BuyerSentiment.SKEPTICAL]: 'Escéptico',
}
