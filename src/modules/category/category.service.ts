import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './infrastructure/category.repository';
import { CreateCategoryDTO } from './interface/dto/create-category-dto';
import { UpdateCategoryDTO } from './interface/dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

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

  async findOneByUserId(userId: number, categoryId: number) {
    const category = await this.categoryRepository.findOne({
      id: categoryId,
      userId
    });

    if (!category) throw new NotFoundException('Category not found.');
    return category;
  }

  async update(userId: number, categoryId: number, data: UpdateCategoryDTO) {
    await this.findOneByUserId(userId, categoryId);
    return await this.categoryRepository.updateById(categoryId, data);
  }

  async delete(userId: number, categoryId: number) {
    await this.findOneByUserId(userId, categoryId);
    return await this.categoryRepository.deleteById(categoryId);
  }
}
