import OpenAIClient from 'openai-client'
import { CustomerRepository } from 'repositories/customer.repository'
import { LlmAnalysisRepository } from 'repositories/llm-analysis.repository'
import { MeetingRepository } from 'repositories/meeting.repository'
import { SalesAgentRepository } from 'repositories/sales-agent.repository'

import { cleanDatabase } from '../helpers/clean-database.helper'
import { parseOpenAIResponse } from '../helpers/parse-openai-response.helper'
import { parseCsv } from '../helpers/process-csv.helper'

export const createLlmAnalysisUseCase = async (csvContent: string) => {
  const salesAgentRepository = new SalesAgentRepository()
  const customerRepository = new CustomerRepository()
  const meetingRepository = new MeetingRepository()
  const llmAnalysisRepository = new LlmAnalysisRepository()

  const parsedCsv = parseCsv(csvContent)

  if (!parsedCsv.isValid || !parsedCsv.rows.length) {
    throw new Error(parsedCsv.error || 'CSV inválido o vacío')
  }

  await cleanDatabase()

  const openAIClient = new OpenAIClient()

  const processRow = async (row: (typeof parsedCsv.rows)[0], index: number) => {
    try {
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
        closed: row.closed === '1',
        transcript: row.transcript,
      })

      const openAIResponse = await openAIClient.sendMessage(row.transcript)
      const parsedResponse = parseOpenAIResponse(openAIResponse.content)

      const llmAnalysis = await llmAnalysisRepository.create({
        meetingId: meeting.id,
        ...parsedResponse,
      })

      return llmAnalysis
    } catch (error) {
      console.error(`Error procesando fila ${index + 1}:`, error)
      return null
    }
  }

  const batchSize = 5
  const results = []

  for (let i = 0; i < parsedCsv.rows.length; i += batchSize) {
    const batch = parsedCsv.rows.slice(i, i + batchSize)
    const batchResults = await Promise.all(
      batch.map((row, batchIndex) => processRow(row, i + batchIndex))
    )
    results.push(...batchResults.filter((r) => r !== null))

    if (i + batchSize < parsedCsv.rows.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return results
}
