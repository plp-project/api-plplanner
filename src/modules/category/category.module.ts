import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from './infrastructure/category.repository';
import { CategoryController } from './interface/category.controller';
import { CategoryService } from './category.service';
import { GoalRepositoryModule } from '../goal/infrastructure/goal.repository';

@Module({
  imports: [CategoryRepositoryModule, GoalRepositoryModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
