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
import { TaskDuration, TaskStatus } from '../../infrastructure/model/interface';

export class CreateTaskDTO implements Partial<TaskEntity> {
  @ApiProperty({ minLength: 3, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly description: string;

  @ApiPropertyOptional({ default: TaskStatus.TODO, enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;

  @ApiProperty({ enum: TaskDuration })
  @IsEnum(TaskDuration)
  readonly duration: TaskDuration;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly categoryId: number;
}
