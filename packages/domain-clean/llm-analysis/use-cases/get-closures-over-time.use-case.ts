import { MeetingRepository } from 'repositories/meeting.repository'

export const getClosuresOverTimeUseCase = async () => {
  const meetingRepository = new MeetingRepository()

  const allMeetings = await meetingRepository.findAll()
  const closedData = await meetingRepository.getClosedByDateRange()

  if (allMeetings.length === 0) {
    return []
  }

  const dates = allMeetings
    .map((m) => new Date(m.date))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())

  if (dates.length === 0) {
    return []
  }

  const firstDate = new Date(dates[0])
  const lastDate = new Date(dates[dates.length - 1])

  firstDate.setDate(1)
  lastDate.setDate(1)

  const closedMap = new Map<string, number>()
  closedData.forEach((item) => {
    const date = new Date(item.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const currentCount = closedMap.get(monthKey) || 0
    closedMap.set(monthKey, currentCount + item.count)
  })

  const result = []
  const currentDate = new Date(firstDate)

  while (currentDate <= lastDate) {
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
    const monthName = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`
    
    result.push({
      date: monthName,
      count: closedMap.get(monthKey) || 0,
    })

    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return result
}
