'use client';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { CHART_COLORS } from '../_helpers/colors';
import { translateDiscoverySource } from '../_helpers/translations';
export function DiscoverySourcesDonutChart({ data }) {
    return (<Card>
      <CardHeader>
        <CardTitle>Fuentes de Descubrimiento de Vambe</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data.map((item) => ({
            ...item,
            source: translateDiscoverySource(item.source),
        }))} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.source}: ${entry.total}`} outerRadius={80} fill={CHART_COLORS[0]} dataKey="total">
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]}/>))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
