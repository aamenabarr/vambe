import { Industry, TechnologicalMaturity } from 'domain-clean/enums'
import { MeetingRepository } from 'repositories/meeting.repository'

export type DashboardFilters = {
  sellerId?: string
  industry?: Industry
  techMaturity?: TechnologicalMaturity
  dateFrom?: string
  dateTo?: string
}

export const getSalesOverTimeUseCase = async (filters: DashboardFilters) => {
  const meetingRepository = new MeetingRepository()

  const meetings = await meetingRepository.findWithFilters({
    sellerId: filters.sellerId,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  })

    const monthMap = new Map<string, { reuniones: number; cierres: number }>()

    meetings.forEach((meeting) => {
      const date = new Date(meeting.date)
      const monthName = date.toLocaleDateString('es-ES', { month: 'short' })

      if (!monthMap.has(monthName)) {
        monthMap.set(monthName, { reuniones: 0, cierres: 0 })
      }

      const monthData = monthMap.get(monthName)!
      monthData.reuniones++
      if (meeting.closed) {
        monthData.cierres++
      }
    })

    const sortedMonths = Array.from(monthMap.entries())
      .sort((a, b) => {
        const dateA = new Date(a[0] + ' 1, 2024')
        const dateB = new Date(b[0] + ' 1, 2024')
        
        return dateA.getTime() - dateB.getTime()
      })
      .slice(-12)

    return sortedMonths.map(([month, data]) => ({
      month,
      reuniones: data.reuniones,
      cierres: data.cierres,
      tasaCierre: data.reuniones > 0 ? (data.cierres / data.reuniones) * 100 : 0,
    }))
}
