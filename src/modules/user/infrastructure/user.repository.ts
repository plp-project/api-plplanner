import { Injectable, Module } from '@nestjs/common';
import { FindOneOptions, Repository, DataSource } from 'typeorm';
import { UserEntity } from './model';
import {
  getDataSourceToken,
  getRepositoryToken,
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { IUserEntity } from './model/interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>,
  ) {}

  async create(payload: IUserEntity): Promise<UserEntity> {
    const user = this.userModel.create(payload);
    return this.userModel.save(user);
  }

  async findOne(
    filters: FindOneOptions<UserEntity>['where'],
  ): Promise<UserEntity> {
    return this.userModel.findOne({ where: filters });
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserRepository,
    {
      provide: getRepositoryToken(UserEntity),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(UserEntity);
      },
    },
  ],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
