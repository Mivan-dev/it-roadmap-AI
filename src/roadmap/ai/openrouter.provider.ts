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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://it-roadmap-ai.netlify.app',
          'X-Title': 'IT Roadmap AI',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          plugins: [{ id: 'web' }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter error ${response.status}: ${errorText}`);
      }

      const data = await response.json() as any;
      const text: string = data.choices?.[0]?.message?.content ?? '';

      this.logger.log('Texto recibido: ' + text);

      let cleaned = text.replace(/```json|```/g, '').trim();

      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se encontró JSON válido en la respuesta');
      }
      cleaned = jsonMatch[0];

      cleaned = cleaned.replace(/:\s*ti-([a-z0-9-]+)/g, ': "ti-$1"');

      return JSON.parse(cleaned) as RoadmapResponse;

    } catch (error) {
      clearTimeout(timeout);
      this.logger.error('Error al llamar a OpenRouter:', error);
      throw new Error('Error generando el roadmap: ' + error);
    }
  }
}