import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskEntity } from 'src/modules/task/infrastructure/model';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { TaskDuration, TaskStatus } from '../../infrastructure/model/interface';

export class UpdateTaskDTO implements Partial<TaskEntity> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 255)
  readonly description: string;

  @ApiPropertyOptional({ default: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty()
  @IsEnum(TaskDuration)
  readonly duration: TaskDuration;
}
