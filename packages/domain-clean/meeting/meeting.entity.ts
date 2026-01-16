import { z } from 'zod'

export const MeetingSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  salesAgentId: z.string().uuid(),
  date: z.string(),
  closed: z.boolean(),
  transcript: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export class Meeting {
  private readonly _data: z.infer<typeof MeetingSchema>

  constructor(data: z.infer<typeof MeetingSchema>) {
    const validatedData = MeetingSchema.parse(data)
    this._data = validatedData
  }

  get id() {
    return this._data.id
  }

  get customerId() {
    return this._data.customerId
  }

  get salesAgentId() {
    return this._data.salesAgentId
  }

  get date() {
    return this._data.date
  }

  get closed() {
    return this._data.closed
  }

  get transcript() {
    return this._data.transcript
  }

  get createdAt() {
    return this._data.createdAt
  }

  get updatedAt() {
    return this._data.updatedAt
  }

  toObject() {
    return this._data
  }
}
