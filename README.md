# VAMBE Dashboard

Dashboard de análisis de leads y ventas para Vambe, procesando transcripciones de reuniones comerciales mediante IA.

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd vambe
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env.local` en la raíz del proyecto:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vambe

# OpenAI
OPENAI_API_KEY=tu_api_key_aqui
OPENAI_ASSISTANT_ID=tu_assistant_id_aqui
```

4. Ejecutar migraciones:
```bash
npm run db:migrate
```

## Desarrollo

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El dashboard estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el código con Prettier
- `npm run db:generate` - Genera esquemas de Drizzle ORM
- `npm run db:migrate` - Ejecuta migraciones de base de datos

## Estructura del Proyecto

```
vambe/
├── apps/
│   └── dashboard/          # Aplicación Next.js principal
├── packages/
│   ├── database/          # Configuración de Drizzle ORM y esquemas
│   ├── domain-clean/      # Lógica de negocio y casos de uso
│   ├── openai-client/     # Cliente para API de OpenAI
│   ├── repositories/       # Repositorios de acceso a datos
│   ├── translations/       # Traducciones de enums
│   ├── ui/                # Componentes UI compartidos
│   └── tsconfig/          # Configuraciones TypeScript
└── turbo.json             # Configuración de Turborepo
```

## Uso

1. Subir CSV: Haz clic en "Subir CSV" en el dashboard
2. El CSV debe contener las siguientes columnas:
   - nombre
   - correo electronico
   - numero de telefono
   - fecha de la reunion
   - vendedor asignado
   - closed (1 o 0)
   - transcripcion

3. El sistema procesará cada fila:
   - Creará/actualizará clientes y vendedores
   - Analizará la transcripción con OpenAI
   - Guardará el análisis en la base de datos
   - Actualizará las métricas del dashboard

## Despliegue

El proyecto está configurado para desplegarse en Vercel con Neon DB:

1. Conectar el repositorio a Vercel
2. Configurar variables de entorno en Vercel
3. El despliegue se ejecutará automáticamente en cada push a main