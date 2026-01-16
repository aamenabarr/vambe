import { drizzleClient } from 'database'
import { Meeting as MeetingEntity } from 'domain-clean/meeting/meeting.entity'

import { Meeting, meetingsTable } from '../database/schemas'

export const buildMeeting = (data: Meeting): MeetingEntity => {
  return new MeetingEntity({
    ...data,
    date: typeof data.date === 'string' ? data.date : (data.date as Date).toISOString(),
    createdAt: typeof data.createdAt === 'string' ? data.createdAt : (data.createdAt as Date).toISOString(),
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : (data.updatedAt as Date).toISOString(),
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
    const [result] = await this._context
      .insert(meetingsTable)
      .values({
        customerId: data.customerId,
        salesAgentId: data.salesAgentId,
        date: data.date,
        closed: data.closed,
        transcript: data.transcript,
      })
      .returning()

    return buildMeeting(result)
  }

  async deleteAll() {
    return await this._context.delete(meetingsTable)
  }
}
