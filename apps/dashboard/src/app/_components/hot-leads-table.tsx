'use client'

import { Card, CardHeader, CardTitle } from 'ui/components/card'
import { Skeleton } from 'ui/components/skeleton'

interface HotLead {
  id: string
  customerName: string
  customerEmail: string
  salesAgentName: string
  leadScore: number
  status: string
  buyerSentiment: string
  industry: string
  purchaseIntention: string
}

interface HotLeadsTableProps {
  leads: HotLead[]
  loading?: boolean
}

export function HotLeadsTable({ leads, loading }: HotLeadsTableProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabla de Hot Leads</CardTitle>
      </CardHeader>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-sm font-medium">Cliente</th>
                <th className="p-2 text-left text-sm font-medium">Vendedor</th>
                <th className="p-2 text-left text-sm font-medium">Score</th>
                <th className="p-2 text-left text-sm font-medium">Estado</th>
                <th className="p-2 text-left text-sm font-medium">Sentimiento</th>
                <th className="p-2 text-left text-sm font-medium">Industria</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 10).map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="p-2">
                    <div className="font-medium">{lead.customerName}</div>
                    <div className="text-sm text-gray-500">{lead.customerEmail}</div>
                  </td>
                  <td className="p-2">{lead.salesAgentName}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-yellow-500"
                          style={{ width: `${lead.leadScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{lead.leadScore}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-2 text-sm">{lead.buyerSentiment}</td>
                  <td className="p-2 text-sm">{lead.industry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
