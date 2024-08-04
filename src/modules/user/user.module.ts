import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './infrastructure/user.repository';
import { UserService } from './user.service';
import { UserController } from './interface/user.controller';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [UserRepositoryModule, HelpersModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
