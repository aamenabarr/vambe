import dynamic from 'next/dynamic';
import { getAllMetricsUseCase } from 'domain-clean/llm-analysis/use-cases/get-all-metrics.use-case';
// Deshabilita SSR para el Dashboard completo
const Dashboard = dynamic(() => import('./_components/dashboard').then(mod => ({ default: mod.Dashboard })), {
    ssr: false,
    loading: () => (<div className="min-h-screen bg-[#0A1121] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
          <p className="text-white text-lg">Cargando dashboard...</p>
        </div>
      </div>)
});
export default async function Home() {
    let data;
    try {
        data = await getAllMetricsUseCase();
    }
    catch (error) {
        data = {
            metricsCards: {
                averageLeadScore: 0,
                hotLeadsCount: 0,
                totalLeads: 0,
                closeRate: 0,
                hotLeadsCloseRate: 0,
            },
            hotLeads: [],
            closuresOverTime: [],
            buyerSentimentVsClosures: [],
            objectionsAnalysis: { frequency: [] },
            industryClosures: [],
            discoverySources: [],
            conversionBySource: [],
            techMaturityVsClosures: [],
            customerPainsByIndustry: [],
        };
    }
    return <Dashboard {...data}/>;
}
