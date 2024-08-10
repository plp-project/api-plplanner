import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/create-category-dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @Auth()
  async create(@Body() category: CreateCategoryDTO) {
    return await this.categoryService.create(category);
  }
  @Get()
  @ApiOperation({ summary: 'Find all categories' })
  async findAll() {
    return await this.categoryService.findAll();
  }
}
