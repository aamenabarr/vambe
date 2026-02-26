# Vambe Dashboard

Dashboard de análisis de leads para Vambe AI. Procesa transcripciones de reuniones de venta con OpenAI y visualiza métricas en un panel interactivo.

## Requisitos

- Node.js 18+
- Base de datos PostgreSQL (Neon)
- API Key de OpenAI

## Instalación

```bash
git clone https://github.com/aamenabarr/vambe.git
cd vambe
npm install
```

## Variables de entorno

Crear archivo `.env` en la raíz con:

```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
```

## Base de datos

Aplicar el schema a la base de datos:

```bash
npx drizzle-kit push
```

## Ejecutar en local

```bash
npm run dev
```

Abrir http://localhost:3000

## Uso

1. Hacer clic en "Subir CSV" para cargar el archivo de leads
2. El procesamiento con OpenAI inicia automáticamente
3. La barra de progreso en la card "Leads Procesados" muestra el avance
4. Una vez procesado, explorar las tabs Pipeline, Equipo, Segmentación e Insights IA
