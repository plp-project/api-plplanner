import { Module } from '@nestjs/common';
import { PlanningRepositoryModule } from './infrastructure/planning.repository';
import { PlanningController } from './interface/planning.controller';
import { PlanningService } from './planning.service';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [PlanningRepositoryModule, HelpersModule],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
