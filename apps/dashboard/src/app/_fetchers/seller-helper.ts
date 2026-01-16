import { SalesAgentRepository } from 'repositories/sales-agent.repository'

export async function getSellerIdByName(sellerName: string): Promise<string | undefined> {
  if (!sellerName) {
    return undefined
  }

  const repository = new SalesAgentRepository()
  const seller = await repository.findByName(sellerName)

  return seller?.id
}
