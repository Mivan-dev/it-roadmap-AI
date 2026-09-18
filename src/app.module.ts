import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RoadmapModule } from './roadmap/roadmap.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RoadmapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
