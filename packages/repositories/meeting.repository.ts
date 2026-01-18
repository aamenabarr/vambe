import { drizzleClient } from 'database'
import { Meeting as MeetingEntity } from 'domain-clean/meeting/meeting.entity'

import { Meeting, meetingsTable } from '../database/schemas'

const toDateString = (value: string | Date): string => {
  return typeof value === 'string' ? value : value.toISOString()
}

export const buildMeeting = (data: Meeting): MeetingEntity => {
  return new MeetingEntity({
    ...data,
    date: toDateString(data.date as string | Date),
    createdAt: toDateString(data.createdAt as string | Date),
    updatedAt: toDateString(data.updatedAt as string | Date),
  })
}

export class MeetingRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }

  async create(data: {
    customerId: string
    salesAgentId: string
    date: string
    closed: boolean
    transcript: string
  }) {
    const [result] = await this._context.insert(meetingsTable).values(data).returning()

    return buildMeeting(result)
  }

  async deleteAll() {
    return await this._context.delete(meetingsTable)
  }
}
