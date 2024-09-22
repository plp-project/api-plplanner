import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CategoryRepository } from './infrastructure/category.repository';
import { CreateCategoryDTO } from './interface/dto/create-category-dto';
import { UpdateCategoryDTO } from './interface/dto/update-category-dto';
import { GoalRepository } from '../goal/infrastructure/goal.repository';
import { TaskRepository } from '../task/infrastructure/task.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly goalRepository: GoalRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  async create(userId: number, category: CreateCategoryDTO) {
    return await this.categoryRepository.create({ ...category, userId });
  }

  async findAllByUserId(userId: number) {
    return await this.categoryRepository.find({ userId });
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) throw new NotFoundException('Category not found.');
    return category;
  }

  async findOneByUser(userId: number, categoryId: number) {
    const category = await this.categoryRepository.findOne({
      id: categoryId,
      userId
    });

    if (!category) throw new NotFoundException('Category not found.');
    return category;
  }

  async update(userId: number, categoryId: number, data: UpdateCategoryDTO) {
    await this.findOneByUser(userId, categoryId);
    return await this.categoryRepository.updateById(categoryId, data);
  }

  async delete(userId: number, categoryId: number) {
    await this.findOneByUser(userId, categoryId);
    const goalWithCategory = await this.goalRepository.findOne({ categoryId });
    const taskWithCategory = await this.taskRepository.findOne({ categoryId });

    if (goalWithCategory || taskWithCategory)
      throw new ConflictException(
        "This category can't be deleted because it has goals or tasks associated with it."
      );

    return await this.categoryRepository.deleteById(categoryId);
  }
}
