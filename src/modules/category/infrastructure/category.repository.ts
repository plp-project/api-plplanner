import { Injectable, Module } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoryEntity } from './model';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ICategoryEntity } from './model/interface';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>
  ) {}

  async create(payload: ICategoryEntity): Promise<CategoryEntity> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async find(
    where?: FindOptionsWhere<CategoryEntity>
  ): Promise<CategoryEntity[]> {
    return this.repository.find({ where });
  }

  async findOne(
    where: FindOptionsWhere<CategoryEntity>
  ): Promise<CategoryEntity> {
    return this.repository.findOne({ where });
  }

  async exists(where?: FindOptionsWhere<CategoryEntity>): Promise<boolean> {
    return this.repository.exists({ where });
  }

  async updateById(
    id: number,
    payload: Partial<ICategoryEntity>
  ): Promise<CategoryEntity> {
    const res = await this.repository.update(id, payload);
    if (res.affected && res.affected > 0) {
      return await this.repository.findOne({ where: { id } });
    }
    return null;
  }

  async deleteById(id: number): Promise<boolean> {
    const res = await this.repository.delete(id);
    return res.affected && res.affected > 0;
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryRepository],
  exports: [CategoryRepository]
})
export class CategoryRepositoryModule {}
