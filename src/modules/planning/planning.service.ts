import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanningRepository } from './infrastructure/planning.repository';
import { CreatePlanningDTO } from './interface/dto/create-planning-dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PlanningService {
  constructor(
    private readonly planningRepository: PlanningRepository,
    private readonly userService: UserService
  ) {}

  async create(userId: number, planning: CreatePlanningDTO) {
    await this.userService.findOneById(userId);
    return this.planningRepository.create({ ...planning, userId });
  }

  async findAllByUser(userId: number) {
    await this.userService.findOneById(userId);
    return this.planningRepository.find({ userId }, { tasks: true });
  }

  async findUserPlanning(userId: number, planningId: number) {
    await this.userService.findOneById(userId);
    const planning = this.planningRepository.find(
      { userId, id: planningId },
      { tasks: true }
    );
    if (!planning) throw new NotFoundException('Planning not found.');
    return planning;
  }
}
