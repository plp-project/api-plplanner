import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export enum reportPeriods {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export class CreateReportDTO {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  readonly date: Date;

  @ApiProperty()
  @IsEnum(reportPeriods)
  @IsNotEmpty()
  readonly period: reportPeriods;
}
