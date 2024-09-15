import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalEntity } from '../../infrastructure/model';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { GoalDuration, goalStatus } from '../../infrastructure/model/interface';

export class CreateGoalDTO implements Partial<GoalEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly description: string;

  @ApiProperty({ enum: GoalDuration })
  @IsEnum(GoalDuration)
  @IsNotEmpty()
  readonly duration: GoalDuration;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @ApiPropertyOptional({ default: goalStatus.TODO })
  @IsOptional()
  @IsEnum(goalStatus)
  readonly status?: goalStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
