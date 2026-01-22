# Documentación de Arquitectura y Decisiones de Diseño

## Categorías y Dimensiones de Análisis

### Categorías Principales

El sistema analiza las transcripciones de reuniones según las siguientes dimensiones:

#### 1. **Lead Score (0-100)**
Puntuación general del lead basada en múltiples factores:
- **Intención de compra (30%)**: Nivel de urgencia y compromiso del cliente
- **Madurez tecnológica (20%)**: Capacidad del cliente para adoptar tecnología
- **Sentimiento del comprador (20%)**: Actitud y confianza durante la reunión
- **Claridad de pain points (15%)**: Identificación de problemas específicos
- **Ausencia de objeciones críticas (15%)**: Menos objeciones = mayor score

**Escalas**:
- 0-30: Lead frío
- 31-60: Lead tibio
- 61-85: Lead caliente
- 86-100: Lead muy caliente

#### 2. **Purchase Intention**
- `LOW`: Exploración sin urgencia
- `MEDIUM`: Comparación activa con timeline aproximado
- `HIGH`: Necesidad urgente con presupuesto aprobado

#### 3. **Technological Maturity**
- `UNDEFINED`: Información insuficiente
- `ANALOG`: Procesos manuales, resistencia al cambio
- `DIGITALIZED`: Herramientas digitales básicas
- `TECH_SAVVY`: Múltiples herramientas integradas, APIs, automatizaciones

#### 4. **Vambe Discovery Source**
Fuente de origen del lead:
- `CONFERENCE`, `GOOGLE_SEARCH`, `COLLEAGUE_RECOMMENDATION`, `LINKEDIN`, `PODCAST`, `ONLINE_ARTICLE`, `FORUM_GROUP`, `NETWORKING_EVENT`, `OTHER`

#### 5. **Buyer Sentiment**
- `CONFIDENT`: Entusiasta y positivo
- `NEUTRAL`: Profesional y reservado
- `SKEPTICAL`: Dudas y reservas
- `FRUSTRATED`: Insatisfacción con situación actual

#### 6. **Customer Pains** (Array)
Problemas identificados del cliente:
- `HIGH_VOLUME_INTERACTIONS`, `TEAM_OVERLOAD`, `RESPONSE_TIME_DELAYS`, `INCONSISTENT_SERVICE`, `LACK_OF_AUTOMATION`, `DATA_SILOS`, `SCALABILITY_ISSUES`, `COST_INEFFICIENCY`, `CUSTOMER_CHURN`, `MANUAL_REPORTING`

#### 7. **Purchase Objections** (Array)
Objeciones identificadas:
- `BUDGET_CONSTRAINTS`, `IMPLEMENTATION_EFFORT`, `INTEGRATION_CONCERNS`, `SECURITY_WORRIES`, `ROI_DOUBTS`, `COMPETITOR_COMPARISON`, `TIMING_ISSUES`, `DECISION_MAKER_APPROVAL`

#### 8. **Industry**
Sector del cliente (20+ categorías desde `RETAIL_ECOMMERCE` hasta `OTHER`)

### Justificación de las Dimensiones

Estas dimensiones fueron seleccionadas porque:
1. **Cubren el ciclo completo de ventas**: Desde el descubrimiento hasta el cierre
2. **Son accionables**: Cada métrica puede influir en estrategias de seguimiento
3. **Permiten segmentación**: Facilita identificar patrones y oportunidades
4. **Son medibles**: Pueden ser extraídas consistentemente de transcripciones

## Arquitectura del Sistema

### Stack Tecnológico

#### **Next.js**
**Decisión**: Usar Next.js para frontend y backend
**Razón**:
- **Server-Side Rendering (SSR)**: Las métricas se calculan en el servidor, mejorando tiempo de carga inicial
- **API Routes**: Permite crear endpoints sin servidor separado

#### **TypeScript**
**Decisión**: TypeScript en todo el proyecto
**Razón**:
- **Type Safety**: Previene errores en tiempo de compilación
- **Escalabilidad**: Facilita mantener código en proyectos grandes

#### **PostgreSQL con Neon DB**
**Decisión**: PostgreSQL como base de datos relacional
**Razón**:
- **Relaciones complejas**: Necesitamos relaciones entre Customers, Meetings, SalesAgents, y LlmAnalyses
- **Neon DB Serverless**: 
  - Escalado automático
  - Sin gestión de infraestructura
  - Conexiones serverless optimizadas para Vercel
  - Backups automáticos

#### **Drizzle ORM**
**Decisión**: Drizzle en lugar de Prisma o TypeORM
**Razón**:
- **Type Safety**: TypeScript-first con inferencia de tipos
- **Performance**: Queries SQL optimizadas, sin overhead
- **Migraciones simples**: Generación automática de migraciones

#### **Turborepo**
**Decisión**: Monorepo con Turborepo
**Razón**:
- **Code Sharing**: Packages compartidos (domain-clean, repositories, ui)
- **Consistencia**: Mismo tooling y versiones en todo el proyecto

#### **Recharts**
**Decisión**: Recharts para visualizaciones
**Razón**:
- **React Native**: Componentes React puros
- **Flexibilidad**: Fácil personalización
- **Performance**: Renderizado eficiente
- **Documentación**: Buena documentación y ejemplos

### Procesamiento con OpenAI

#### **Flujo de Procesamiento**

1. **Upload CSV** → API Route recibe archivo
2. **Parse CSV** → Valida formato y extrae filas
3. **Batch Processing** → Procesa en lotes de 5 filas
4. **Por cada fila**:
   - Crea/actualiza Customer y SalesAgent
   - Crea Meeting
   - Envía transcripción a OpenAI Assistant
   - Parsea respuesta JSON
   - Crea LlmAnalysis

#### **Procesamiento en Batches**

**Decisión**: Procesar en lotes de 5 con delay de 1 segundo
**Razón**:
- **Rate Limiting**: OpenAI tiene límites de requests por minuto
- **Error Handling**: Si una fila falla, las demás continúan
- **Performance**: Balance entre velocidad y estabilidad
- **Costos**: Controla el uso de tokens de OpenAI

### Extracción de Métricas

#### **Patrón Use Case**

Cada métrica tiene su propio use case:
- `getMetricsCardsUseCase`: Métricas principales (cards)
- `getHotLeadsUseCase`: Leads con score >= 80
- `getClosuresOverTimeUseCase`: Cierres por mes
- `getBuyerSentimentVsClosuresUseCase`: Análisis por sentimiento
- `getObjectionsAnalysisUseCase`: Frecuencia e impacto de objeciones
- Y más...

**Ventajas**:
- **Separación de responsabilidades**: Cada use case tiene un propósito claro
- **Reutilización**: Fácil de usar en diferentes contextos
- **Testabilidad**: Cada use case puede testearse independientemente
- **Mantenibilidad**: Cambios en una métrica no afectan otras

Las métricas se calculan principalmente en la base de datos usando:
- `GROUP BY` para agrupaciones

### Packages y Modularidad

#### **Estructura de Packages**

1. **domain-clean**: Lógica de negocio pura, sin dependencias externas
2. **repositories**: Acceso a datos, abstracción de la base de datos
3. **database**: Esquemas y configuración de Drizzle
4. **openai-client**: Cliente para API de OpenAI
5. **ui**: Componentes React reutilizables
6. **translations**: Traducciones de enums al español
7. **tsconfig**: Configuraciones TypeScript compartidas

**Beneficios**:
- **Reutilización**: Packages pueden usarse en otros proyectos
- **Testing**: Cada package puede testearse independientemente
- **Claridad**: Dependencias explícitas entre módulos
- **Escalabilidad**: Fácil agregar nuevos packages

### Despliegue en Vercel con Neon DB

#### **Vercel**
**Razón**:
- **Serverless Functions**: Escala automáticamente
- **Edge Network**: CDN global para assets estáticos
- **Integración con Git**: Deploy automático en push

#### **Neon DB Serverless**
**Razón**:
- **Serverless PostgreSQL**: Sin gestión de servidores
- **Auto-scaling**: Se adapta a la carga
- **Connection Pooling**: Optimizado para serverless functions