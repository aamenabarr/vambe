import { BuyerProfile } from 'domain-clean/enums'

export const buyerProfileTranslation: Record<BuyerProfile, string> = {
  [BuyerProfile.UNDEFINED]: 'Indefinido',
  [BuyerProfile.ANALYTICAL]: 'Analítico',
  [BuyerProfile.RELATIONAL]: 'Relacional',
  [BuyerProfile.VISIONARY]: 'Visionario',
}
