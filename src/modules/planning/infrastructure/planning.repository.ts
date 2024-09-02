import { Injectable, Module } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { PlanningEntity } from './model';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { IPlanningEntity } from './model/interface';

@Injectable()
export class PlanningRepository {
  constructor(
    @InjectRepository(PlanningEntity)
    private repository: Repository<PlanningEntity>
  ) {}

  async create(payload: IPlanningEntity): Promise<PlanningEntity> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async find(
    where?: FindOptionsWhere<PlanningEntity>,
    relations?: FindOptionsRelations<PlanningEntity>
  ): Promise<PlanningEntity[]> {
    return this.repository.find({ where, relations });
  }

  async findOne(
    where: FindOptionsWhere<PlanningEntity>,
    relations?: FindOptionsRelations<PlanningEntity>
  ): Promise<PlanningEntity> {
    return this.repository.findOne({ where, relations });
  }

  async exists(
    where?: FindOptionsWhere<PlanningEntity>,
    relations?: FindOptionsRelations<PlanningEntity>
  ): Promise<boolean> {
    return this.repository.exists({ where, relations });
  }

  async updateById(
    id: number,
    payload: Partial<IPlanningEntity>
  ): Promise<PlanningEntity> {
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
  imports: [TypeOrmModule.forFeature([PlanningEntity])],
  providers: [PlanningRepository],
  exports: [PlanningRepository]
})
export class PlanningRepositoryModule {}
