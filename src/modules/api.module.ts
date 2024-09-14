import { Module } from '@nestjs/common';
import { HelpersModule } from './helpers/helpers.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'src/config/database';
import { GoalModule } from './goal/goal.module';
import { CategoryModule } from './category/category.module';
import { PlanningModule } from './planning/planning.module';
import { TaskModule } from './task/task.module';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GoalModule,
    PlanningModule,
    TaskModule,
    CategoryModule,
    ReminderModule,
    HelpersModule,
    TypeOrmModule.forRootAsync(TypeORMConfig)
  ]
})
export class ApiModule {}
