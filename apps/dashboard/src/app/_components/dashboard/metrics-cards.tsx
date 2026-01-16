import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle } from 'lucide-react'

import { Card, CardContent } from 'ui'

import { getMetrics } from '../../_fetchers/get-metrics.fetcher'
import { Filters } from './filters-bar'

type MetricsCardsProps = {
  filters: Filters
}

export async function MetricsCards({ filters }: MetricsCardsProps) {
  const metrics = await getMetrics(filters)

  const metricsData = [
    {
      title: 'Tasa de Cierre',
      value: `${metrics.closeRate.value.toFixed(0)}%`,
      change: `${metrics.closeRate.changePercent >= 0 ? '+' : ''}${metrics.closeRate.changePercent.toFixed(1)}%`,
      trend: metrics.closeRate.changePercent >= 0 ? 'up' : 'down',
      icon: Target,
      description: 'vs. mes anterior',
    },
    {
      title: 'Valor Potencial Total',
      value: `$${(metrics.totalPotentialValue.value / 1000000).toFixed(1)}M`,
      change: `${metrics.totalPotentialValue.changePercent >= 0 ? '+' : ''}${metrics.totalPotentialValue.changePercent.toFixed(1)}%`,
      trend: metrics.totalPotentialValue.changePercent >= 0 ? 'up' : 'down',
      icon: DollarSign,
      description: 'Pipeline activo',
    },
    {
      title: 'Revenue at Risk',
      value: `$${(metrics.revenueAtRisk.value / 1000).toFixed(0)}K`,
      change: `${metrics.revenueAtRisk.changePercent >= 0 ? '+' : ''}${metrics.revenueAtRisk.changePercent.toFixed(1)}%`,
      trend: metrics.revenueAtRisk.changePercent >= 0 ? 'up' : 'down',
      icon: AlertTriangle,
      description: 'Por falta de automatización',
    },
    {
      title: 'Hot Leads (Score >80)',
      value: `${metrics.hotLeads.value}`,
      change: `${metrics.hotLeads.change >= 0 ? '+' : ''}${metrics.hotLeads.change}`,
      trend: metrics.hotLeads.change >= 0 ? 'up' : 'down',
      icon: Users,
      description: 'Listos para cerrar',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric) => (
        <Card
          key={metric.title}
          className="border-primary/50 bg-primary transition-colors hover:border-primary/70"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-primary-foreground/70">{metric.title}</p>
                <p className="text-3xl font-bold text-primary-foreground">{metric.value}</p>
                <div className="flex items-center gap-1 text-sm">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="size-4 text-primary-foreground" />
                  ) : (
                    <TrendingDown className="size-4 text-[#EF4444]" />
                  )}
                  <span
                    className={metric.trend === 'up' ? 'text-primary-foreground' : 'text-[#EF4444]'}
                  >
                    {metric.change}
                  </span>
                  <span className="text-primary-foreground/70">{metric.description}</span>
                </div>
              </div>
              <div className="rounded-lg bg-primary-foreground/20 p-2">
                <metric.icon className="size-5 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
