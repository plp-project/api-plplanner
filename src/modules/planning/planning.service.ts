import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanningRepository } from './infrastructure/planning.repository';
import { CreatePlanningDTO } from './interface/dto/create-planning-dto';
import { UpdatePlanningDTO } from './interface/dto/update-planning.dto';
import { plainToClass } from 'class-transformer';
import { TaskEntity } from '../task/infrastructure/model';
import { planningPeriods } from './interface/dto/find-all-planning-dto';
import { DateHelper } from '../helpers/date/date-helper';
import {
  And,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual
} from 'typeorm';
import { PlanningEntity } from './infrastructure/model';

@Injectable()
export class PlanningService {
  constructor(
    private readonly planningRepository: PlanningRepository,
    private readonly dateHelper: DateHelper
  ) {}

  async create(userId: number, planning: CreatePlanningDTO) {
    const tasks = planning.tasks.map((task) => plainToClass(TaskEntity, task));
    try {
      return await this.planningRepository.create({
        ...planning,
        tasks,
        userId
      });
    } catch (error) {
      if (error.message.includes('FOREIGN KEY (`categoryId`)'))
        throw new NotFoundException('One or more categories not found.');
      throw error;
    }
  }

  async findAllByUser(userId: number, interval?: planningPeriods) {
    const filterConditions: FindOptionsWhere<PlanningEntity> = { userId };

    if (interval) {
      const { initialDate, finalDate } = this.dateHelper.calculatePeriod(
        new Date(),
        interval
      );
      filterConditions.day = And(
        MoreThanOrEqual(initialDate),
        LessThanOrEqual(finalDate)
      );
    }

    return await this.planningRepository.find(filterConditions, {
      tasks: true
    });
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
