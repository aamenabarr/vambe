import OpenAIClient from 'openai-client'
import { CustomerRepository } from 'repositories/customer.repository'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'
import { SalesAgentRepository } from 'repositories/sales-agent.repository'

import { parseOpenAIResponse } from '../helpers/parse-openai-response.helper'
import { parseCsv } from '../helpers/process-csv.helper'

export const createLlmAnalysisUseCase = async (csvContent: string) => {
  const parsedCsv = parseCsv(csvContent)

  if (!parsedCsv.isValid || !parsedCsv.rows.length) {
    throw new Error(parsedCsv.error || 'CSV inválido o vacío')
  }

  const salesAgentRepository = new SalesAgentRepository()
  const customerRepository = new CustomerRepository()
  const meetingRepository = new MeetingRepository()
  const llmAnalysisRepository = new LlmAnalysisRepository()

  await llmAnalysisRepository.deleteAll()
  await meetingRepository.deleteAll()
  await customerRepository.deleteAll()
  await salesAgentRepository.deleteAll()

  const openAIClient = new OpenAIClient()

  const processRow = async (row: typeof parsedCsv.rows[0]) => {
    const salesAgent = await salesAgentRepository.findOrCreate(row.salesAgent)

    const customer = await customerRepository.findOrCreate({
      name: row.customerName,
      email: row.customerEmail,
      phone: row.customerPhone,
    })

    const meeting = await meetingRepository.create({
      customerId: customer.id,
      salesAgentId: salesAgent.id,
      date: row.meetingDate,
      closed: row.closed === '1' || row.closed === 'true',
      transcript: row.transcript,
    })

    const openAIResponse = await openAIClient.sendMessage(row.transcript)
    const parsedResponse = parseOpenAIResponse(openAIResponse.content)

    const llmAnalysis = await llmAnalysisRepository.create({
      meetingId: meeting.id,
      ...parsedResponse,
    })

    return llmAnalysis
  }

  const results = await Promise.all(
    parsedCsv.rows.map((row) => processRow(row)),
  )

  return results
}
