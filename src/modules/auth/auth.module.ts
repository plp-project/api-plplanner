import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { AuthService } from './auth.service';
import { UserRepositoryModule } from '../user/infrastructure/user.repository';

@Module({
  imports: [UserRepositoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
