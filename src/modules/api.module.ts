import { Module } from '@nestjs/common';
import { HelpersModule } from './helpers/helpers.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/database';

@Module({
  imports: [
    AuthModule,
    UserModule,
    HelpersModule,
    TypeOrmModule.forRoot(TypeORMConfig),
  ],
})
export class ApiModule {}
