import { Injectable, Module } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { GoalEntity } from './model';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { IGoalEntity } from './model/interface';

@Injectable()
export class GoalRepository {
  constructor(
    @InjectRepository(GoalEntity)
    private repository: Repository<GoalEntity>
  ) {}

  async create(payload: IGoalEntity): Promise<GoalEntity> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async find(
    where?: FindOptionsWhere<GoalEntity>,
    relations?: FindOptionsRelations<GoalEntity>
  ): Promise<GoalEntity[]> {
    return this.repository.find({ where, relations });
  }

  async findOne(
    where: FindOptionsWhere<GoalEntity>,
    relations?: FindOptionsRelations<GoalEntity>
  ): Promise<GoalEntity> {
    return this.repository.findOne({ where, relations });
  }

  async exists(
    where?: FindOptionsWhere<GoalEntity>,
    relations?: FindOptionsRelations<GoalEntity>
  ): Promise<boolean> {
    return this.repository.exists({ where, relations });
  }

  async updateById(
    id: number,
    payload: Partial<IGoalEntity>
  ): Promise<GoalEntity> {
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
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  providers: [GoalRepository],
  exports: [GoalRepository]
})
export class GoalRepositoryModule {}
