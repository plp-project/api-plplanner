import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskEntity } from 'src/modules/task/infrastructure/model';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskDuration, TaskStatus } from '../../infrastructure/model/interface';

export class CreateTaskDTO implements Partial<TaskEntity> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 255)
  readonly description: string;

  @ApiPropertyOptional({ default: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;

  @ApiProperty()
  @IsEnum(TaskDuration)
  readonly duration: TaskDuration;
}
