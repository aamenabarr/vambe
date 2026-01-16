import { BuyerSentiment } from 'domain-clean/enums'
import { ArrowUpDown, Flame } from 'lucide-react'
import { buyerSentimentTranslation } from 'translations/enums/buyer-sentiment'
import { industryTranslation } from 'translations/enums/industry'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'ui'

import { getLeadScoreTable } from '../../_fetchers/get-lead-score-table.fetcher'
import { Filters } from './filters-bar'

type LeadScoreTableProps = {
  filters: Filters
}

export async function LeadScoreTable({ filters }: LeadScoreTableProps) {
  const leads = await getLeadScoreTable(filters)

  const getScoreBadge = (score: number) => {
    if (score >= 85)
      return (
        <Badge className="border-emerald-500/30 bg-emerald-500/20 text-emerald-500">Hot Lead</Badge>
      )
    if (score >= 60)
      return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-500">Tibio</Badge>

    return <Badge className="border-red-500/30 bg-red-500/20 text-red-500">Frío</Badge>
  }

  const getSentimentColor = (sentiment: BuyerSentiment) => {
    if (sentiment === BuyerSentiment.CONFIDENT) return 'text-emerald-500'
    if (sentiment === BuyerSentiment.NEUTRAL) return 'text-yellow-500'

    return 'text-red-500'
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Flame className="size-5 text-orange-500" />
              Tabla de Hot Leads
            </CardTitle>
            <CardDescription>Leads ordenados por score de mayor a menor</CardDescription>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            {leads.filter((l) => l.score >= 80).length} Hot Leads
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground">Vendedor</TableHead>
                <TableHead className="text-muted-foreground">
                  <div className="flex items-center gap-1">
                    Score <ArrowUpDown className="size-3" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground">Sentimiento</TableHead>
                <TableHead className="text-muted-foreground">Industria</TableHead>
                <TableHead className="text-right text-muted-foreground">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-secondary/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{lead.customerName}</p>
                      <p className="text-xs text-muted-foreground">{lead.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.sellerName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-10 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full ${
                            lead.score >= 85
                              ? 'bg-emerald-500'
                              : lead.score >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="font-medium text-foreground">{lead.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getScoreBadge(lead.score)}</TableCell>
                  <TableCell className={getSentimentColor(lead.buyerSentiment)}>
                    {buyerSentimentTranslation[lead.buyerSentiment]}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {industryTranslation[lead.industry]}
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    ${(lead.value / 1000).toFixed(0)}K
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
