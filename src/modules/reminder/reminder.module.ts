import { Module } from '@nestjs/common';
import { PlanningRepositoryModule } from './infrastructure/reminder.repository';

@Module({
  imports: [PlanningRepositoryModule],
  controllers: [],
  providers: []
})
export class ReminderModule {}
