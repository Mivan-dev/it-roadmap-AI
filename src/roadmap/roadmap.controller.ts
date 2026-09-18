import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import type { RoadmapParams, RoadmapResponse } from './models.js';
import { RoadmapService } from './roadmap.service.js';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  generateRoadmap(@Body() params: RoadmapParams): Promise<RoadmapResponse> {
    return this.roadmapService.generateRoadmap(params);
  }
}