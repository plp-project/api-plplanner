import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from './infrastructure/category.repository';

@Module({
  imports: [CategoryRepositoryModule],
  controllers: [],
  providers: []
})
export class CategoryModule {}
