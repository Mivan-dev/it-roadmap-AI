import { Injectable } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from './models.js';
import { AiService } from './ai/ai.service.js';

@Injectable()
export class RoadmapService {
  constructor(private readonly aiService: AiService) {}

  generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    return this.aiService.generateRoadmap(params);
  }
}