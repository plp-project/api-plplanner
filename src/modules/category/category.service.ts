import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './infrastructure/category.repository';
import { CreateCategoryDTO } from './interface/dto/create-category-dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(userId: number, category: CreateCategoryDTO) {
    return await this.categoryRepository.create({ ...category, userId });
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) throw new NotFoundException('Category not found.');
    return category;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }
}
