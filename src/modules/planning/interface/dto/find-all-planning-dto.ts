import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum planningPeriods {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export class FindAllPlanningsQueryDTO {
  @ApiProperty()
  @IsOptional()
  @IsEnum(planningPeriods)
  readonly period?: planningPeriods;
}
