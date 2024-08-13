import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/create-category-dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Create a category' })
  @Auth()
  async create(@UserId() id: number, @Body() category: CreateCategoryDTO) {
    return await this.categoryService.create(id, category);
  }
  @Get()
  @ApiOperation({ summary: 'Find all categories' })
  async findAll() {
    return await this.categoryService.findAll();
  }
}
