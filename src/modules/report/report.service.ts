import { Injectable } from '@nestjs/common';
import { GoalRepository } from '../goal/infrastructure/goal.repository';
import { TaskRepository } from '../task/infrastructure/task.repository';
import { CategoryRepository } from '../category/infrastructure/category.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}
}
