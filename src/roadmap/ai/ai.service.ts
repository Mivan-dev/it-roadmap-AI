import { Injectable } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from '../models.js';
import { OpenRouterProvider } from './openrouter.provider.js';

@Injectable()
export class AiService {
  constructor(private readonly openRouterProvider: OpenRouterProvider) {}

  generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    return this.openRouterProvider.generateRoadmap(params);
  }
}