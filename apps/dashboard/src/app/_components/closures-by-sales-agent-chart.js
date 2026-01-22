'use client';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { ChartSkeleton } from 'ui/components/chart-skeleton';
import { VAMBE_COLORS } from '../_helpers/colors';
export function ClosuresBySalesAgentChart({ data, loading }) {
    if (loading) {
        return (<Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>);
    }
    return (<Card>
      <CardHeader>
        <CardTitle>Cierres por Sales Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="salesAgentName"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="closed" fill={VAMBE_COLORS.primary} name="Cierres"/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
