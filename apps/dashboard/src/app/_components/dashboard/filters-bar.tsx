'use client'

import { FilterValue, Industry, TechnologicalMaturity } from 'domain-clean/enums'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { industryTranslation } from 'translations/enums/industry'
import { technologicalMaturityTranslation } from 'translations/enums/technological-maturity'

import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'ui'

import { SalesAgentsSelect } from './sales-agents-select'

export type Filters = {
  seller: string
  industry: string
  techMaturity: string
}

type FiltersBarProps = {
  initialSeller?: string
  salesAgents: Array<{ id: string; name: string }>
}

export function FiltersBar({ initialSeller, salesAgents }: FiltersBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const filters = {
    seller: searchParams.get('seller') || initialSeller || FilterValue.ALL,
    industry: searchParams.get('industry') || FilterValue.ALL,
    techMaturity: searchParams.get('techMaturity') || FilterValue.ALL,
  }

  const updateFilter = (key: keyof Filters, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === FilterValue.ALL) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <Card className="border-border/50 bg-card p-4">
      <div className="flex flex-wrap items-center justify-end gap-4">
        <span className="mr-auto text-sm font-medium text-muted-foreground">Filtros</span>

        <SalesAgentsSelect
          value={filters.seller}
          onValueChange={(v) => updateFilter('seller', v)}
          salesAgents={salesAgents}
        />

        <Select value={filters.techMaturity} onValueChange={(v) => updateFilter('techMaturity', v)}>
          <SelectTrigger className="w-[240px] border-border/50 bg-secondary">
            <SelectValue placeholder="Madurez Tecnológica" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FilterValue.ALL}>Todos los niveles</SelectItem>
            {Object.values(TechnologicalMaturity)
              .filter((v) => v !== TechnologicalMaturity.UNDEFINED)
              .map((maturity) => (
                <SelectItem key={maturity} value={maturity}>
                  {technologicalMaturityTranslation[maturity]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={filters.industry} onValueChange={(v) => updateFilter('industry', v)}>
          <SelectTrigger className="w-[240px] border-border/50 bg-secondary">
            <SelectValue placeholder="Industria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FilterValue.ALL}>Todas las Industrias</SelectItem>
            {Object.values(Industry)
              .filter((v) => v !== Industry.UNDEFINED)
              .map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industryTranslation[industry]}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
