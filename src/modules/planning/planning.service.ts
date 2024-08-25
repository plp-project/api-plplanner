import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanningRepository } from './infrastructure/planning.repository';
import { CreatePlanningDTO } from './interface/dto/create-planning-dto';
import { UpdatePlanningDTO } from './interface/dto/update-planning.dto';
import { plainToClass } from 'class-transformer';
import { TaskEntity } from '../task/infrastructure/model';

@Injectable()
export class PlanningService {
  constructor(private readonly planningRepository: PlanningRepository) {}

  async create(userId: number, planning: CreatePlanningDTO) {
    const tasks = planning.tasks.map((task) => plainToClass(TaskEntity, task));
    return await this.planningRepository.create({ ...planning, tasks, userId });
  }

  async findAllByUser(userId: number) {
    return await this.planningRepository.find({ userId }, { tasks: true });
  }

  async findOneByUser(userId: number, planningId: number) {
    const planning = await this.planningRepository.findOne(
      { userId, id: planningId },
      { tasks: true }
    );

    if (!planning) throw new NotFoundException('Planning not found.');
    return planning;
  }

  async update(userId: number, planningId: number, data: UpdatePlanningDTO) {
    await this.findOneByUser(userId, planningId);
    return await this.planningRepository.updateById(planningId, data);
  }

  async delete(userId: number, planningId: number) {
    await this.findOneByUser(userId, planningId);
    return await this.planningRepository.deleteById(planningId);
  }
}
