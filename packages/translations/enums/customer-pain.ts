import { CustomerPain } from 'domain-clean/enums'

export const customerPainTranslation: Record<CustomerPain, string> = {
  [CustomerPain.UNDEFINED]: 'Indefinido',
  [CustomerPain.HIGH_VOLUME_INTERACTIONS]: 'Alto volumen de interacciones',
  [CustomerPain.MANUAL_PROCESS_INEFFICIENCY]: 'Ineficiencia de procesos manuales',
  [CustomerPain.RESPONSE_TIME_DELAYS]: 'Demoras en tiempo de respuesta',
  [CustomerPain.SCALABILITY_ISSUES]: 'Problemas de escalabilidad',
  [CustomerPain.TEAM_OVERLOAD]: 'Sobrecarga del equipo',
  [CustomerPain.LACK_OF_AUTOMATION]: 'Falta de automatización',
  [CustomerPain.CUSTOMER_EXPERIENCE_DEGRADATION]: 'Degradación de experiencia del cliente',
  [CustomerPain.PEAK_SEASON_OVERLOAD]: 'Sobrecarga en temporadas pico',
  [CustomerPain.OTHER]: 'Otro',
}
