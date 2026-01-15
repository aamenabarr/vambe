import { DummyRepository } from 'repositories/dummy/dummy.repository'

export const getDummyUseCase = async (id: string) => {
  const dummyRepository = new DummyRepository()

  const dummy = await dummyRepository.get(id)

  if (!dummy) {
    throw new Error('dummy not found')
  }

  return dummy
}
