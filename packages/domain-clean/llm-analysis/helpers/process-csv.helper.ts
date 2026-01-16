export interface CsvRow {
  salesAgent: string
  customerName: string
  customerEmail: string
  customerPhone: string
  meetingDate: string
  closed: string
  transcript: string
}

export interface ProcessedCsvData {
  rows: CsvRow[]
  isValid: boolean
  error?: string
}

export const validateCsvFormat = (csvContent: string): boolean => {
  const expectedColumns = [
    'nombre',
    'correo electronico',
    'numero de telefono',
    'fecha de la reunion',
    'vendedor asignado',
    'closed',
    'transcripcion',
  ]

  const lines = csvContent.trim().split('\n')
  if (lines.length < 2) {
    return false
  }

  const headerLine = lines[0].toLowerCase()
  const hasAllColumns = expectedColumns.every((col) =>
    headerLine.includes(col.toLowerCase()),
  )

  return hasAllColumns
}

export const parseCsv = (csvContent: string): ProcessedCsvData => {
  if (!validateCsvFormat(csvContent)) {
    return {
      rows: [],
      isValid: false,
      error: 'Formato de CSV inválido. Debe contener las columnas: Nombre, Correo Electronico, Numero de Telefono, Fecha de la Reunion, Vendedor asignado, closed, Transcripcion',
    }
  }

  const lines = csvContent.trim().split('\n')
  const headers = lines[0]
    .split(',')
    .map((h) => h.trim().toLowerCase().replace(/"/g, ''))

  const rows: CsvRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = parseCsvLine(line)
    if (values.length !== headers.length) continue

    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index]?.replace(/^"|"$/g, '') || ''
    })

    // Buscar índices de columnas en español
    const salesAgentIndex = headers.findIndex(
      (h) => h.includes('vendedor') || h.includes('asignado'),
    )
    const customerNameIndex = headers.findIndex(
      (h) => h === 'nombre',
    )
    const customerEmailIndex = headers.findIndex(
      (h) => h.includes('correo') || h.includes('electronico'),
    )
    const customerPhoneIndex = headers.findIndex(
      (h) => h.includes('telefono') || h.includes('numero'),
    )
    const meetingDateIndex = headers.findIndex(
      (h) => h.includes('fecha') || h.includes('reunion'),
    )
    const closedIndex = headers.findIndex(
      (h) => h === 'closed',
    )
    const transcriptIndex = headers.findIndex(
      (h) => h === 'transcripcion',
    )

    if (
      salesAgentIndex === -1 ||
      customerNameIndex === -1 ||
      customerEmailIndex === -1 ||
      meetingDateIndex === -1 ||
      closedIndex === -1 ||
      transcriptIndex === -1 ||
      customerPhoneIndex === -1
    ) {
      continue
    }

    rows.push({
      salesAgent: values[salesAgentIndex]?.replace(/^"|"$/g, '') || '',
      customerName: values[customerNameIndex]?.replace(/^"|"$/g, '') || '',
      customerEmail: values[customerEmailIndex]?.replace(/^"|"$/g, '') || '',
      customerPhone: values[customerPhoneIndex]?.replace(/^"|"$/g, '') || '',
      meetingDate: values[meetingDateIndex]?.replace(/^"|"$/g, '') || '',
      closed: values[closedIndex]?.replace(/^"|"$/g, '') || '',
      transcript: values[transcriptIndex]?.replace(/^"|"$/g, '') || '',
    })
  }

  return {
    rows,
    isValid: rows.length > 0,
  }
}

const parseCsvLine = (line: string): string[] => {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  values.push(current.trim())

  return values
}
