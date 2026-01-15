import { drizzleClient } from 'database'
import { Meeting as MeetingEntity } from 'domain-clean/meeting/meeting.entity'
import { Meeting } from '../database/schemas'

export const buildMeeting = (data: Meeting): MeetingEntity => {
  return new MeetingEntity(data)
}

export class MeetingRepository {
  private _context: typeof drizzleClient

  constructor() {
    this._context = drizzleClient
  }

  setContext(context: typeof drizzleClient) {
    this._context = context
  }
}
