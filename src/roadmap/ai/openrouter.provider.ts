import { Injectable, Logger } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from '../models.js';
import { buildRoadmapPrompt } from './prompt.builder.js';

@Injectable()
export class OpenRouterProvider {
  private readonly logger = new Logger(OpenRouterProvider.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = process.env['OPENROUTER_API_KEY'] ?? '';
  }

  async generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    const prompt = buildRoadmapPrompt(params);

    this.logger.log(`Generando roadmap para: ${params.language} - ${params.objective}`);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:4200',
          'X-Title': 'IT Roadmap AI',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          plugins: [{ id: 'web' }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter error ${response.status}: ${errorText}`);
      }

      const data = await response.json() as any;
      const text: string = data.choices?.[0]?.message?.content ?? '';

      this.logger.log('Texto recibido: ' + text);

      // Limpieza del texto
      let cleaned = text.replace(/```json|```/g, '').trim();

      // Extraer solo el JSON si hay texto extra antes o después
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se encontró JSON válido en la respuesta');
      }
      cleaned = jsonMatch[0];

      // Corregir valores de icon sin comillas: icon: ti-xxx → icon: "ti-xxx"
      cleaned = cleaned.replace(/:\s*ti-([a-z0-9-]+)/g, ': "ti-$1"');

      return JSON.parse(cleaned) as RoadmapResponse;

    } catch (error) {
      this.logger.error('Error al llamar a OpenRouter:', error);
      throw new Error('Error generando el roadmap: ' + error);
    }
  }
}