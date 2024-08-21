import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { GoalRepository } from './infrastructure/goal.repository';
import { CreateGoalDTO } from './interface/dto/create-goal-dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class GoalService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService
  ) {}

  async create(userId: number, categoryId: number, goal: CreateGoalDTO) {
    await this.userService.findOneById(userId);
    await this.categoryService.findOneByUserId(userId, categoryId);
    return await this.goalRepository.create({ ...goal, userId, categoryId });
  }

  async findAll(userId: number) {
    return await this.goalRepository.find({ userId }, { category: true });
  }

  async update(id: number, data: Partial<CreateGoalDTO>) {
    return await this.goalRepository.updateById(id, data);
  }

  async deleteById(id: number) {
    return await this.goalRepository.deleteById(id);
  }
}
