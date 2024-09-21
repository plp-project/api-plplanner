import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskEntity } from 'src/modules/task/infrastructure/model';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import {
  taskDurations,
  taskStatuses
} from '../../infrastructure/model/interface';

export class CreateTaskDTO implements Partial<TaskEntity> {
  @ApiProperty({ minLength: 3, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly description: string;

  @ApiPropertyOptional({ default: taskStatuses.TODO, enum: taskStatuses })
  @IsOptional()
  @IsEnum(taskStatuses)
  readonly status = taskStatuses.TODO;

  @ApiProperty({ enum: taskDurations })
  @IsEnum(taskDurations)
  readonly duration: taskDurations;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly categoryId: number;
}
