import { PurchaseObjection } from 'domain-clean/enums'

export const purchaseObjectionTranslation: Record<PurchaseObjection, string> = {
  [PurchaseObjection.UNDEFINED]: 'Indefinido',
  [PurchaseObjection.TECHNOLOGY_CONCERNS]: 'Preocupaciones tecnológicas',
  [PurchaseObjection.DATA_CONFIDENTIALITY]: 'Confidencialidad de datos',
  [PurchaseObjection.LOSS_OF_PERSONAL_TOUCH]: 'Pérdida del toque personal',
  [PurchaseObjection.INTEGRATION_COMPLEXITY]: 'Complejidad de integración',
  [PurchaseObjection.BUDGET_CONSTRAINTS]: 'Restricciones presupuestarias',
  [PurchaseObjection.UNCERTAINTY_ABOUT_RESULTS]: 'Incertidumbre sobre resultados',
  [PurchaseObjection.COMPATIBILITY_ISSUES]: 'Problemas de compatibilidad',
  [PurchaseObjection.IMPLEMENTATION_EFFORT]: 'Esfuerzo de implementación',
  [PurchaseObjection.OTHER]: 'Otro',
}
