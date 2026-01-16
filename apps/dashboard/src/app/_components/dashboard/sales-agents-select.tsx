'use client'

import { FilterValue } from 'domain-clean/enums'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'ui'

type SalesAgentsSelectProps = {
  value: string
  onValueChange: (value: string) => void
  salesAgents: Array<{ id: string; name: string }>
}

export function SalesAgentsSelect({
  value,
  onValueChange,
  salesAgents,
}: SalesAgentsSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[240px] border-border/50 bg-secondary">
        <SelectValue placeholder="Vendedor" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={FilterValue.ALL}>Todos los Vendedores</SelectItem>
        {salesAgents.map((agent) => (
          <SelectItem key={agent.id} value={agent.name}>
            {agent.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
