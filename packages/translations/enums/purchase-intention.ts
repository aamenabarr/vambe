import { PurchaseIntention } from 'domain-clean/enums'

export const purchaseIntentionTranslation: Record<PurchaseIntention, string> = {
  [PurchaseIntention.LOW]: 'Baja',
  [PurchaseIntention.MEDIUM]: 'Media',
  [PurchaseIntention.HIGH]: 'Alta',
}
