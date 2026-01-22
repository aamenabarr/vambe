import Image from 'next/image';
import { BuyerSentimentVsClosuresChart } from './buyer-sentiment-vs-closures-chart';
import { ClosuresOverTimeChart } from './closures-over-time-chart';
import { ConversionBySourceChart } from './conversion-by-source-chart';
import { CustomerPainsHeatmap } from './customer-pains-heatmap';
import { DiscoverySourcesDonutChart } from './discovery-sources-donut-chart';
import { HotLeadsTable } from './hot-leads-table';
import { IndustryClosuresChart } from './industry-closures-chart';
import { MetricsCards } from './metrics-cards';
import { ObjectionsFrequencyChart } from './objections-frequency-chart';
import { TechMaturityVsClosuresChart } from './tech-maturity-vs-closures-chart';
import { UploadCsvButton } from './upload-csv-button';
export function Dashboard({ metricsCards, hotLeads, closuresOverTime, buyerSentimentVsClosures, objectionsAnalysis, industryClosures, discoverySources, conversionBySource, techMaturityVsClosures, customerPainsByIndustry, }) {
    return (<div className="min-h-screen bg-[#0A1121] flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0A1121]/80 backdrop-blur-xl border-b border-[#1E3A8A]/40 p-4">
        <Image src="/logo.png" alt="Vambe" width={120} height={40}/>
        <UploadCsvButton />
      </header>

      <main className="flex-1 p-6">
        <MetricsCards {...metricsCards}/>

        <div className="space-y-6">
          <HotLeadsTable leads={hotLeads || []}/>

          <ClosuresOverTimeChart data={closuresOverTime || []}/>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BuyerSentimentVsClosuresChart data={buyerSentimentVsClosures || []}/>
            <ObjectionsFrequencyChart data={objectionsAnalysis?.frequency || []}/>
          </div>

          <IndustryClosuresChart data={industryClosures || []}/>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DiscoverySourcesDonutChart data={discoverySources || []}/>
            <ConversionBySourceChart data={conversionBySource || []}/>
          </div>

          <TechMaturityVsClosuresChart data={techMaturityVsClosures || []}/>

          <CustomerPainsHeatmap data={customerPainsByIndustry || []}/>
        </div>
      </main>
    </div>);
}
