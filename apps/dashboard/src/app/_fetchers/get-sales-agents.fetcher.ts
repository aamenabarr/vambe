import { SalesAgentRepository } from 'repositories/sales-agent.repository'

export async function getSalesAgents() {
  const repository = new SalesAgentRepository()
  
  const salesAgents = await repository.findAll()
  
  return salesAgents.map((agent) => ({
    id: agent.id,
    name: agent.name,
  }))
}
