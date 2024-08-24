import { Module } from '@nestjs/common';
import { PlanningRepositoryModule } from './infrastructure/planning.repository';
import { UserModule } from '../user/user.module';
import { PlanningController } from './interface/planning.controller';
import { PlanningService } from './planning.service';

@Module({
  imports: [PlanningRepositoryModule, UserModule],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
