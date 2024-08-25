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

  async create(userId: number, planningId: number, task: CreateTaskDTO) {
    const { categoryId } = task;
    await this.planningService.findOneByUser(userId, planningId);
    await this.categoryService.findOneByUser(userId, categoryId);
    return this.taskRepository.create({ ...task, planningId });
  }

  async findOneByUser(userId: number, taskId: number) {
    const task = await this.taskRepository.findOne({
      id: taskId,
      planning: { userId }
    });

    if (!task) throw new NotFoundException('Task not found.');
    return task;
  }

  async update(userId: number, taskId: number, data: UpdateTaskDTO) {
    await this.findOneByUser(userId, taskId);
    await this.categoryService.findOneByUser(userId, data.categoryId);
    return this.taskRepository.updateById(taskId, data);
  }

  async delete(userId: number, taskId: number) {
    await this.findOneByUser(userId, taskId);
    return this.taskRepository.deleteById(taskId);
  }
}
