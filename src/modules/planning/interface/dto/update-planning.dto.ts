import { ApiPropertyOptional } from '@nestjs/swagger';
import { IPlanningEntity } from '../../infrastructure/model/interface';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdatePlanningDTO implements Partial<IPlanningEntity> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly day: Date;
}
