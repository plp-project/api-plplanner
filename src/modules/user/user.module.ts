import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './infrastructure/user.repository';
import { UserService } from './user.service';
import { UserController } from './interface/user.controller';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
