import { Module, forwardRef } from '@nestjs/common';
import { UserRepositoryModule } from './infrastructure/user.repository';
import { UserService } from './user.service';
import { UserController } from './interface/user.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), UserRepositoryModule, HelpersModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
