import { VambeDiscoverySource } from 'domain-clean/enums'

export const vambeDiscoverySourceTranslation: Record<VambeDiscoverySource, string> = {
  [VambeDiscoverySource.UNDEFINED]: 'Indefinido',
  [VambeDiscoverySource.CONFERENCE]: 'Conferencia/Seminario/Taller/Webinar/Feria',
  [VambeDiscoverySource.GOOGLE_SEARCH]: 'Búsqueda en Google',
  [VambeDiscoverySource.COLLEAGUE_RECOMMENDATION]: 'Recomendación de Colega/Amigo',
  [VambeDiscoverySource.LINKEDIN]: 'LinkedIn',
  [VambeDiscoverySource.PODCAST]: 'Podcast',
  [VambeDiscoverySource.ONLINE_ARTICLE]: 'Artículo en Línea',
  [VambeDiscoverySource.FORUM_GROUP]: 'Foro/Grupo',
  [VambeDiscoverySource.NETWORKING_EVENT]: 'Evento de Networking',
  [VambeDiscoverySource.OTHER]: 'Otro',
}
