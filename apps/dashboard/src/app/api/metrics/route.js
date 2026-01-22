import { getAllMetricsUseCase } from 'domain-clean/llm-analysis/use-cases/get-all-metrics.use-case';
import { NextResponse } from 'next/server';
export const GET = async () => {
    try {
        const metrics = await getAllMetricsUseCase();
        return NextResponse.json({ success: true, data: metrics });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Error al obtener las métricas';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
};
