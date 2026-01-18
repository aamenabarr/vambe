import { MeetingRepository } from 'repositories/meeting.repository'

export const getClosuresOverTimeUseCase = async () => {
  const meetingRepository = new MeetingRepository()

  const data = await meetingRepository.getClosedByDateRange()

  return data.map((item) => ({
    date: item.date,
    count: item.count,
  }))
}
