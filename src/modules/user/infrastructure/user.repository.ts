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
}

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserRepositoryModule {}
