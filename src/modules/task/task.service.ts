import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './infrastructure/task.repository';
import { PlanningService } from '../planning/planning.service';
import { CreateTaskDTO } from './interface/dto/create-task-dto';
import { CategoryService } from '../category/category.service';
import { UpdateTaskDTO } from './interface/dto/update-task-dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryService: CategoryService,
    private readonly planningService: PlanningService
  ) {}

  async create(
    userId: number,
    categoryId: number,
    planningId: number,
    task: CreateTaskDTO
  ) {
    await this.categoryService.findOneByUser(userId, categoryId);
    await this.planningService.findUserPlanning(userId, planningId);
    return this.taskRepository.create({
      ...task,
      categoryId,
      planningId
    });
  }

  async update(userId: number, taskId: number, data: UpdateTaskDTO) {
    const task = await this.taskRepository.findOne({ id: taskId });
    if (!task) throw new NotFoundException('Task not found.');
    await this.categoryService.findOneByUser(userId, data.categoryId);
    return this.taskRepository.updateById(taskId, data);
  }
}
