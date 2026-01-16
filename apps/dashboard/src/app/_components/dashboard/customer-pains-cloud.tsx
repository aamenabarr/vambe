import { MessageSquareQuote } from 'lucide-react'
import { customerPainTranslation } from 'translations/enums/customer-pain'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import { getCustomerPains } from '../../_fetchers/get-customer-pains.fetcher'
import { Filters } from './filters-bar'

type CustomerPainsCloudProps = {
  filters: Filters
}

const getFontSize = (weight: number) => {
  if (weight >= 80) return 'text-xl'
  if (weight >= 60) return 'text-lg'
  if (weight >= 40) return 'text-base'

  return 'text-sm'
}

const getOpacity = (weight: number) => {
  return Math.max(0.4, weight / 100)
}

export async function CustomerPainsCloud({ filters }: CustomerPainsCloudProps) {
  const data = await getCustomerPains(filters)

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MessageSquareQuote className="size-5 text-primary" />
          Voz del Cliente
        </CardTitle>
        <CardDescription>Dolores más mencionados por clientes que SÍ compraron</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap justify-center gap-2">
          {data.pains.map((pain, index) => (
            <span
              key={index}
              className={`${getFontSize(pain.weight)} cursor-default rounded-md bg-primary/10 px-2 py-1 font-medium text-primary transition-colors hover:bg-primary/20`}
              style={{ opacity: getOpacity(pain.weight) }}
              title={`Mencionado ${pain.count} veces`}
            >
              {customerPainTranslation[pain.pain]}
            </span>
          ))}
        </div>

        {data.topPhrases.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Top 3 frases de clientes que compraron:
            </p>
            {data.topPhrases.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border/30 bg-secondary/50 p-3"
              >
                <span className="font-bold text-primary">{index + 1}</span>
                <div className="flex-1">
                  <p className="text-sm italic text-foreground">&quot;{item.phrase}&quot;</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Mencionado {item.count} veces
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
