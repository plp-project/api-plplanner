import { Module } from '@nestjs/common';
import { HelpersModule } from './helpers/helpers.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/database';
import { GoalModule } from './goal/goal.module';
import { CategoryModule } from './category/category.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GoalModule,
    CategoryModule,
    HelpersModule,
    ReportModule,
    TypeOrmModule.forRootAsync(TypeORMConfig)
  ]
})
export class ApiModule {}
