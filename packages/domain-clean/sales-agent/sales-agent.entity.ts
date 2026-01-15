import { z } from 'zod'

export const SalesAgentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export class SalesAgent {
  private readonly _data: z.infer<typeof SalesAgentSchema>

  constructor(data: z.infer<typeof SalesAgentSchema>) {
    const validatedData = SalesAgentSchema.parse(data)
    this._data = validatedData
  }

  get id() {
    return this._data.id
  }

  get name() {
    return this._data.name
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
