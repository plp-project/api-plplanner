import { Injectable, Module } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './model';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { IUserEntity } from './model/interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async create(payload: IUserEntity): Promise<UserEntity> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async find(where?: FindOptionsWhere<UserEntity>): Promise<UserEntity[]> {
    return this.repository.find({ where });
  }

  async findOne(where: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return this.repository.findOne({ where });
  }

  async exists(where?: FindOptionsWhere<UserEntity>): Promise<boolean> {
    return this.repository.exists({ where });
  }

  async updateById(
    id: number,
    payload: Partial<IUserEntity>
  ): Promise<UserEntity> {
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
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserRepositoryModule {}
