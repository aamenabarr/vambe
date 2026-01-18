import { createLlmAnalysisUseCase } from 'domain-clean/llm-analysis/use-cases/create.use-case'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No se proporcionó ningún archivo' },
        { status: 400 },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const csvContent = buffer.toString('utf-8')

    await createLlmAnalysisUseCase(csvContent)

    return NextResponse.json({
      success: true,
      message: 'CSV recibido, procesando en background',
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Ha ocurrido un error al procesar el CSV'

    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
