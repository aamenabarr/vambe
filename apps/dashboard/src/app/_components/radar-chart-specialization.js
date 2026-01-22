'use client';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/components/card';
import { ChartSkeleton } from 'ui/components/chart-skeleton';
import { CHART_COLORS } from '../_helpers/colors';
import { translateBuyerSentiment, translateTechMaturity } from '../_helpers/translations';
export function RadarChartSpecialization({ data, type, loading, }) {
    if (loading) {
        return (<Card>
        <CardHeader>
          <ChartSkeleton />
        </CardHeader>
      </Card>);
    }
    const agents = data.map((item) => item.salesAgentName);
    const keys = type === 'buyerSentiment'
        ? (data[0]?.data.map((d) => d.sentiment).filter((k) => Boolean(k)) || [])
        : (data[0]?.data.map((d) => d.tech).filter((k) => Boolean(k)) || []);
    const chartData = keys.map((key) => {
        const translatedKey = type === 'buyerSentiment' ? translateBuyerSentiment(key) : translateTechMaturity(key);
        const item = { name: translatedKey };
        agents.forEach((agent) => {
            const agentData = data.find((d) => d.salesAgentName === agent);
            const value = agentData?.data.find((d) => (type === 'buyerSentiment' ? d.sentiment : d.tech) === key);
            item[agent] = value?.closeRate ?? 0;
        });
        return item;
    });
    const colors = CHART_COLORS;
    return (<Card>
      <CardHeader>
        <CardTitle>
          Eficiencia del Vendedor por {type === 'buyerSentiment' ? 'Buyer Sentiment' : 'Tech Maturity'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name"/>
            <PolarRadiusAxis angle={90} domain={[0, 100]}/>
            {agents.map((agent, index) => (<Radar key={agent} name={agent} dataKey={agent} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} fillOpacity={0.3}/>))}
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>);
}
