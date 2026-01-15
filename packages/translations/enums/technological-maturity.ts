import { TechnologicalMaturity } from 'domain-clean/enums'

export const technologicalMaturityTranslation: Record<TechnologicalMaturity, string> = {
  [TechnologicalMaturity.UNDEFINED]: 'Indefinido',
  [TechnologicalMaturity.ANALOG]: 'Analógico',
  [TechnologicalMaturity.DIGITALIZED]: 'Digitalizado',
  [TechnologicalMaturity.TECH_SAVVY]: 'Tecnológicamente avanzado',
}
