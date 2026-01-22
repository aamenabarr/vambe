'use client';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { VAMBE_COLORS } from '../_helpers/colors';
export function ClosuresOverTimeChart({ data }) {
    return (<Card>
      <CardHeader>
        <CardTitle>Ventas en el Tiempo</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" tickFormatter={(value) => value}/>
            <YAxis />
            <Tooltip labelFormatter={(value) => value} formatter={(value) => [value, 'Cierres']}/>
            <Line type="monotone" dataKey="count" stroke={VAMBE_COLORS.secondary} strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
