'use client'

import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from 'ui/components/button'
import { useToast } from 'ui/components/toast/use-toast'

import { createLlmAnalysisAction } from '../_actions/create-llm-analysis.action'

export const UploadCsvButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: 'Error',
        description: 'El archivo debe ser un CSV',
        variant: 'destructive',
      })

      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await createLlmAnalysisAction(formData)

      if (result.success) {
        toast({
          title: 'Éxito',
          description: result.message,
        })
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al procesar el archivo',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        onClick={handleButtonClick}
        loading={loading}
        icon={<Upload className="size-4" />}
        variant="primary"
      >
        Subir CSV
      </Button>
    </>
  )
}
