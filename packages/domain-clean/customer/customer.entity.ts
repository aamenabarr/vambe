import { z } from 'zod'

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export class Customer {
  private readonly _data: z.infer<typeof CustomerSchema>

  constructor(data: z.infer<typeof CustomerSchema>) {
    const validatedData = CustomerSchema.parse(data)
    this._data = validatedData
  }

  get id() {
    return this._data.id
  }

  get name() {
    return this._data.name
  }

  get email() {
    return this._data.email
  }

  get phone() {
    return this._data.phone
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
