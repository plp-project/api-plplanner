import { Module } from '@nestjs/common';
import { TaskRepositoryModule } from './infrastructure/task.repository';
import { TaskController } from './interface/task.controller';
import { PlanningModule } from '../planning/planning.module';
import { CategoryModule } from '../category/category.module';
import { TaskService } from './task.service';

@Module({
  imports: [TaskRepositoryModule, PlanningModule, CategoryModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
