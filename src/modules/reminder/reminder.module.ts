import { Module } from '@nestjs/common';
import { PlanningRepositoryModule } from './infrastructure/reminder.repository';
import { ReminderController } from './interface/reminder.controller';
import { ReminderService } from './reminder.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PlanningRepositoryModule, UserModule],
  controllers: [ReminderController],
  providers: [ReminderService]
})
export class ReminderModule {}
