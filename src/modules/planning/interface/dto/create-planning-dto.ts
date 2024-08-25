import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  ValidateNested
} from 'class-validator';
import { IPlanningEntity } from '../../infrastructure/model/interface';
import { CreateTaskDTO } from 'src/modules/task/interface/dto/create-task-dto';
import { Type } from 'class-transformer';

type CreatePlanningDTOType = Omit<IPlanningEntity, 'tasks'>;

export class CreatePlanningDTO implements Partial<CreatePlanningDTOType> {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly day: Date;

  @ApiPropertyOptional({ default: [] })
  @IsOptional()
  @Type(() => CreateTaskDTO)
  @ValidateNested({ each: true })
  readonly tasks: CreateTaskDTO[] = [];
}
