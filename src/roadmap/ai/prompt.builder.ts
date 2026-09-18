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
Eres un experto en el mercado laboral IT con acceso a información actualizada del mercado.

Buscá en internet las tendencias actuales del mercado laboral para desarrolladores ${OBJECTIVE_LABELS[params.objective]} con foco en ${params.language} para el período 2026-2030.

Con esa información, generá un roadmap de skills para alguien con ${EXPERIENCE_LABELS[params.experienceLevel]} que quiere dedicarse al ${OBJECTIVE_LABELS[params.objective]} usando ${params.language}, con un horizonte de ${TIMEFRAME_LABELS[params.timeframe]}.

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
          "color": "teal",
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
- Generá entre 3 y 4 fases según el timeframe
- Cada fase debe tener entre 2 y 4 cards
- Los items deben ser concretos y accionables, no genéricos
- Basate en datos reales del mercado que encontrés en internet
`.trim();
}