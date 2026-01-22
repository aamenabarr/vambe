'use client';
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { ChartSkeleton } from 'ui/components/chart-skeleton';
import { VAMBE_COLORS } from '../_helpers/colors';
export function LeadScoreVsCloseRateChart({ data, loading, }) {
    if (loading) {
        return (<Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>);
    }
    const scatterData = data.map((item) => {
        const [min] = item.scoreRange.split('-').map(Number);
        return {
            score: min + 15,
            closeRate: item.closeRate,
            range: item.scoreRange,
            total: item.total,
        };
    });
    return (<Card>
      <CardHeader>
        <CardTitle>Lead Score vs Tasa de Cierre</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={scatterData}>
            <XAxis dataKey="score" name="Score"/>
            <YAxis dataKey="closeRate" name="Tasa de Cierre %"/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={(props) => {
            if (props.active && props.payload && props.payload[0]) {
                const data = props.payload[0].payload;
                return (<div className="rounded-lg border bg-white p-2 shadow-md">
                      <p className="font-semibold">{data.range}</p>
                      <p>Score: {data.score}</p>
                      <p>Tasa de Cierre: {data.closeRate}%</p>
                      <p>Total: {data.total}</p>
                    </div>);
            }
            return null;
        }}/>

            <Scatter dataKey="closeRate" fill={VAMBE_COLORS.primary}/>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
