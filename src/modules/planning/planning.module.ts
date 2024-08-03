import { Module } from '@nestjs/common';
import { PlanningRepositoryModule } from './infrastructure/planning.repository';

@Module({
  imports: [PlanningRepositoryModule],
  controllers: [],
  providers: []
})
export class PlanningModule {}
