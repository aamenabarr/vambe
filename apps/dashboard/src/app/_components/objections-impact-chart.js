'use client';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { ChartSkeleton } from 'ui/components/chart-skeleton';
import { VAMBE_COLORS } from '../_helpers/colors';
import { translateObjection } from '../_helpers/translations';
export function ObjectionsImpactChart({ data, loading }) {
    if (loading) {
        return (<Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>);
    }
    const sortedData = [...data]
        .filter((item) => item.impact > 0)
        .sort((a, b) => b.impact - a.impact)
        .slice(0, 10);
    return (<Card>
      <CardHeader>
        <CardTitle>Objections que Matan Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedData.map((item) => ({
            ...item,
            objection: translateObjection(item.objection),
        }))} layout="vertical">
            <XAxis type="number"/>
            <YAxis dataKey="objection" type="category" width={150}/>
            <Tooltip />
            <Bar dataKey="impact" fill={VAMBE_COLORS.danger} name="Impacto en %"/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
