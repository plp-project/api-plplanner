import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

export enum reportPeriods {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export class CreateReportDTO {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  readonly date: Date;

  @ApiProperty()
  @IsEnum(reportPeriods)
  @IsNotEmpty()
  readonly period: reportPeriods;
}
