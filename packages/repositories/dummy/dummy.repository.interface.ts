import { dummy } from 'database/schemas';

export interface DummyRepositoryInterface {
  get(id: string): Promise<typeof dummy.$inferSelect | null>
}
