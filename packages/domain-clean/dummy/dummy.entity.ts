import { z } from 'zod'

const dummySchema = z.object({
  id: z.string(),
})

export class Dummy {
  constructor(private readonly _data: z.infer<typeof dummySchema>) {
    const validatedData = dummySchema.parse(_data)
    this._data = validatedData
  }

  get id() {
    return this._data.id
  }
}
