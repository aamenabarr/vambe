'use client';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { ChartSkeleton } from 'ui/components/chart-skeleton';
import { CHART_COLORS } from '../_helpers/colors';
import { translatePurchaseIntention } from '../_helpers/translations';
const INTENTION_COLORS = {
    LOW: '#ef4444',
    MEDIUM: '#f59e0b',
    HIGH: '#10b981',
};
export function PurchaseIntentionDistributionChart({ data, loading, }) {
    if (loading) {
        return (<Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>);
    }
    return (<Card>
      <CardHeader>
        <CardTitle>Distribución de Purchase Intention</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data.map((item) => ({
            ...item,
            intention: translatePurchaseIntention(item.intention),
        }))} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.intention}: ${entry.total} (${entry.closeRate}%)`} outerRadius={80} fill={CHART_COLORS[0]} dataKey="total">
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={INTENTION_COLORS[entry.intention] || CHART_COLORS[0]}/>))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
