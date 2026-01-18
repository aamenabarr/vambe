import { CustomerRepository } from 'repositories/customer.repository'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'
import { SalesAgentRepository } from 'repositories/sales-agent.repository'

export const cleanDatabase = async () => {
    const llmAnalysisRepository = new LlmAnalysisRepository()
    const meetingRepository = new MeetingRepository()
    const customerRepository = new CustomerRepository()
    const salesAgentRepository = new SalesAgentRepository()

    await llmAnalysisRepository.deleteAll()
    await meetingRepository.deleteAll()
    await customerRepository.deleteAll()
    await salesAgentRepository.deleteAll()
}
