import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { CategoryService } from '../category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/create-category-dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { UpdateCategoryDTO } from './dto/update-category-dto';

@Controller('category')
@ApiTags('Category')
@Auth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  async create(@UserId() id: number, @Body() category: CreateCategoryDTO) {
    return await this.categoryService.create(id, category);
  }

  @Get()
  @ApiOperation({ summary: 'Find all categories by user' })
  async findAllByUserId(@UserId() userId: number) {
    return await this.categoryService.findAllByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a category by id' })
  async findOneByUserId(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) categoryId: number
  ) {
    return await this.categoryService.findOneByUser(userId, categoryId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  async update(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() category: UpdateCategoryDTO
  ) {
    return await this.categoryService.update(userId, categoryId, category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  async delete(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) categoryId: number
  ) {
    return await this.categoryService.delete(userId, categoryId);
  }
}
