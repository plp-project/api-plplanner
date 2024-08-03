import { Module } from '@nestjs/common';
import { TaskRepositoryModule } from './infrastructure/task.repository';

@Module({
  imports: [TaskRepositoryModule],
  controllers: [],
  providers: []
})
export class TaskModule {}
