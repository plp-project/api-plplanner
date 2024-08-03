import { Module } from '@nestjs/common';
import { GoalRepositoryModule } from './infrastructure/goal.repository';

@Module({
  imports: [GoalRepositoryModule],
  controllers: [],
  providers: []
})
export class GoalModule {}
