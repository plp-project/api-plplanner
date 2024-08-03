import { Injectable, Module } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ReminderEntity } from './model';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { IReminderEntity } from './model/interface';

@Injectable()
export class ReminderRepository {
  constructor(
    @InjectRepository(ReminderEntity)
    private repository: Repository<ReminderEntity>
  ) {}

  async create(payload: IReminderEntity): Promise<ReminderEntity> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async find(
    where?: FindOptionsWhere<ReminderEntity>
  ): Promise<ReminderEntity[]> {
    return this.repository.find({ where });
  }

  async findOne(
    where: FindOptionsWhere<ReminderEntity>
  ): Promise<ReminderEntity> {
    return this.repository.findOne({ where });
  }

  async exists(where?: FindOptionsWhere<ReminderEntity>): Promise<boolean> {
    return this.repository.exists({ where });
  }

  async updateById(
    id: number,
    payload: Partial<IReminderEntity>
  ): Promise<ReminderEntity> {
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
  imports: [TypeOrmModule.forFeature([ReminderEntity])],
  providers: [ReminderRepository],
  exports: [ReminderRepository]
})
export class PlanningRepositoryModule {}
