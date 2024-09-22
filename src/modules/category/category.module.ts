import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from './infrastructure/category.repository';
import { CategoryController } from './interface/category.controller';
import { CategoryService } from './category.service';
import { GoalRepositoryModule } from '../goal/infrastructure/goal.repository';
import { TaskRepositoryModule } from '../task/infrastructure/task.repository';

@Module({
  imports: [
    CategoryRepositoryModule,
    GoalRepositoryModule,
    TaskRepositoryModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
