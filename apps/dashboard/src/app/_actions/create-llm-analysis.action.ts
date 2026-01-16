'use server'

import { createLlmAnalysisUseCase } from 'domain-clean/llm-analysis/use-cases/create.use-case'
import { revalidatePath } from 'next/cache'

export const createLlmAnalysisAction = async (formData: FormData) => {
  try {
    const file = formData.get('file') as File | null

    if (!file) {
      return {
        success: false,
        message: 'No se proporcionó ningún archivo',
      }
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      return {
        success: false,
        message: 'El archivo debe ser un CSV',
      }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const csvContent = buffer.toString('utf-8')

    const result = await createLlmAnalysisUseCase(csvContent)

    if (!result || result.length === 0) {
      return {
        success: false,
        message: 'Error al procesar el CSV',
      }
    }

    revalidatePath('/')

    return {
      success: true,
      message: `Se procesaron ${result.length} reuniones exitosamente`,
    }
  } catch (error) {
    let message = 'Ha ocurrido un error al procesar el CSV'
    if (error instanceof Error) {
      message = error.message
    }

    return {
      success: false,
      message,
    }
  }
}
