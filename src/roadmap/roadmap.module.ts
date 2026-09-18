import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller.js';
import { RoadmapService } from './roadmap.service.js';
import { AiService } from './ai/ai.service.js';
import { OpenRouterProvider } from './ai/openrouter.provider.js';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService, AiService, OpenRouterProvider],
})
export class RoadmapModule {}