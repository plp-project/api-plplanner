import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from '../category/infrastructure/category.repository';
import { GoalRepositoryModule } from '../goal/infrastructure/goal.repository';
import { TaskRepositoryModule } from '../task/infrastructure/task.repository';
import { ReportService } from './report.service';

@Module({
  imports: [
    CategoryRepositoryModule,
    GoalRepositoryModule,
    TaskRepositoryModule
  ],
  controllers: [],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {}
