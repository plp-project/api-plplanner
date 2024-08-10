import { ApiProperty } from '@nestjs/swagger';
import { GoalEntity } from '../../infrastructure/model';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { categories, goalStatus } from '../../infrastructure/model/interface';

export class CreateGoalDTO implements Partial<GoalEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(categories)
  readonly type: categories;

  @ApiProperty()
  @IsEnum(goalStatus)
  readonly status: goalStatus;
}
