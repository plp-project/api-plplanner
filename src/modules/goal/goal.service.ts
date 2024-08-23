import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { GoalRepository } from './infrastructure/goal.repository';
import { CreateGoalDTO } from './interface/dto/create-goal-dto';
import { CategoryService } from '../category/category.service';
import { UpdateGoalDTO } from './interface/dto/update-category.dto';

@Injectable()
export class GoalService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService
  ) {}

  async create(userId: number, categoryId: number, goal: CreateGoalDTO) {
    await this.userService.findOneById(userId);
    await this.categoryService.findOneByUser(userId, categoryId);
    return await this.goalRepository.create({ ...goal, userId, categoryId });
  }

  async findAllByUser(userId: number) {
    return await this.goalRepository.find({ userId }, { category: true });
  }

  async findOneById(id: number) {
    const goal = await this.goalRepository.findOne({ id }, { category: true });
    if (!goal) throw new NotFoundException('Goal not found.');
    return goal;
  }

  async findOneByUser(userId: number, goalId: number) {
    const goal = await this.goalRepository.findOne(
      { id: goalId, userId },
      { category: true }
    );

    if (!goal) throw new NotFoundException('Goal not found.');
    return goal;
  }

  async update(userId: number, goalId: number, data: UpdateGoalDTO) {
    await this.findOneByUser(userId, goalId);
    return await this.goalRepository.updateById(goalId, data);
  }

  async delete(userId: number, goalId: number) {
    await this.findOneByUser(userId, goalId);
    return await this.goalRepository.deleteById(goalId);
  }
}
