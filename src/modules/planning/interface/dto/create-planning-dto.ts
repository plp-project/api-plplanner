import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlanningEntity } from '../../infrastructure/model';
import { TaskEntity } from 'src/modules/task/infrastructure/model';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlanningDTO implements Partial<PlanningEntity> {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly day: Date;

  @ApiPropertyOptional({ default: [] })
  @IsOptional()
  readonly tasks: TaskEntity[];
}
