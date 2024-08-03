import { Injectable, Module } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { TaskEntity } from './model';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ITaskEntity } from './model/interface';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private repository: Repository<TaskEntity>
  ) {}

  async create(payload: ITaskEntity): Promise<TaskEntity> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async find(
    where?: FindOptionsWhere<TaskEntity>,
    relations?: FindOptionsRelations<TaskEntity>
  ): Promise<TaskEntity[]> {
    return this.repository.find({ where, relations });
  }

  async findOne(
    where: FindOptionsWhere<TaskEntity>,
    relations?: FindOptionsRelations<TaskEntity>
  ): Promise<TaskEntity> {
    return this.repository.findOne({ where, relations });
  }

  async exists(
    where?: FindOptionsWhere<TaskEntity>,
    relations?: FindOptionsRelations<TaskEntity>
  ): Promise<boolean> {
    return this.repository.exists({ where, relations });
  }

  async updateById(
    id: number,
    payload: Partial<ITaskEntity>
  ): Promise<TaskEntity> {
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
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskRepository],
  exports: [TaskRepository]
})
export class TaskRepositoryModule {}
