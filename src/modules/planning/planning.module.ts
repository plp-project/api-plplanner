import { Module } from '@nestjs/common';
import { PlanningRepositoryModule } from './infrastructure/planning.repository';
import { PlanningController } from './interface/planning.controller';
import { PlanningService } from './planning.service';

@Module({
  imports: [PlanningRepositoryModule],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
