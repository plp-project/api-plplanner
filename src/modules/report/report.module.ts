import { Module } from '@nestjs/common';
import { GoalRepositoryModule } from '../goal/infrastructure/goal.repository';
import { TaskRepositoryModule } from '../task/infrastructure/task.repository';
import { ReportService } from './report.service';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [GoalRepositoryModule, TaskRepositoryModule, HelpersModule],
  controllers: [],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {}
