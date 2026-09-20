import { RoadmapParams } from '../models.js';

const EXPERIENCE_LABELS: Record<string, string> = {
  none: 'sin experiencia previa en programación',
  basic: 'conocimientos básicos (menos de 1 año)',
  intermediate: 'experiencia intermedia (1-2 años)',
};

const OBJECTIVE_LABELS: Record<string, string> = {
  frontend: 'desarrollo Frontend',
  backend: 'desarrollo Backend',
  fullstack: 'desarrollo Fullstack',
};

const TIMEFRAME_LABELS: Record<string, string> = {
  '6months': '6 meses',
  '1year': '1 año',
  '2years': '2 años',
};

export function buildRoadmapPrompt(params: RoadmapParams): string {
  return `
Eres un experto en el mercado laboral IT con acceso a información actualizada. Buscá en internet las ofertas laborales actuales y tendencias para perfiles Junior de ${OBJECTIVE_LABELS[params.objective]} hacia el año 2030.

Generá un roadmap para alguien con ${EXPERIENCE_LABELS[params.experienceLevel]} que quiere conseguir su primer trabajo como desarrollador ${OBJECTIVE_LABELS[params.objective]}, con un horizonte de ${TIMEFRAME_LABELS[params.timeframe]}.

El stack tecnológico del perfil es: ${params.language}. Mencioná este stack como contexto principal pero NO lo desglosés en detalle — no expliques qué es cada tecnología ni cómo aprenderla paso a paso. El foco del roadmap debe estar en:

- Qué habilidades transversales piden las empresas a perfiles Junior hoy y hacia 2030
- Control de versiones (Git, flujos de trabajo reales en equipos)
- Debugging, lectura de errores y resolución de problemas
- Deploy, CI/CD y entornos (dev, staging, producción)
- Arquitectura básica y buenas prácticas de código
- Comunicación técnica (documentación, code review, pull requests)
- Testing básico
- Seguridad básica
- Uso de herramientas de IA en el flujo de trabajo diario
- Lo que el mercado laboral 2030 va a exigir que hoy todavía no es estándar

Haz énfasis en las habilidades que se valoran en un perfil Junior ademas de las del stack.

Basate en ofertas laborales reales y tendencias del mercado que encontrés en internet.

IMPORTANTE: Respondé ÚNICAMENTE con un JSON válido, sin texto adicional, sin markdown, sin bloques de código.

El JSON debe seguir EXACTAMENTE esta estructura:
{
  "phases": [
    {
      "label": "Fase 1 · 0–3 meses",
      "title": "Título de la fase",
      "description": "Descripción de qué se logra en esta fase",
      "timelineLabel": "Ahora · 0–3m",
      "cards": [
        {
          "title": "Título del card",
          "icon": "ti-brand-angular",
          "color": "blue",
          "fullWidth": false,
          "note": null,
          "items": [
            {
              "text": "Skill o tarea concreta",
              "badge": "hot"
            }
          ]
        }
      ]
    }
  ]
}

Reglas:
- "color" debe ser uno de: teal, blue, purple, amber, coral, gray
- "icon" debe ser un nombre válido de Tabler Icons (ti-*)
- "badge" debe ser uno de: now, ai, hot, base, o null
- Generá entre 3 y 5 fases según el timeframe
- Cada fase debe tener entre 3 y 5 cards
- Máximo 1 card por fase dedicada al stack tecnológico
- El resto de cards deben ser habilidades transversales y del mercado
- Los items deben ser concretos y accionables
- El último tramo debe apuntar claramente al mercado 2030
`.trim();
}