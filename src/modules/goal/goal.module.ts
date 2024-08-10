import { Module } from '@nestjs/common';
import { GoalRepositoryModule } from './infrastructure/goal.repository';
import { GoalController } from './interface/goal.controller';
import { GoalService } from './goal.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [GoalRepositoryModule, UserModule],
  controllers: [GoalController],
  providers: [GoalService],
  exports: [GoalService]
})
export class GoalModule {}
