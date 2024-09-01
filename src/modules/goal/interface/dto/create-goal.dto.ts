import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalEntity } from '../../infrastructure/model';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { GoalStatus } from '../../infrastructure/model/interface';

export class CreateGoalDTO implements Partial<GoalEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly name: string;

  @ApiPropertyOptional({ default: GoalStatus.TODO })
  @IsOptional()
  @IsEnum(GoalStatus)
  readonly status?: GoalStatus;
}
