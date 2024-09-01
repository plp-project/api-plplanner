import { PartialType } from '@nestjs/swagger';
import { CreateGoalDTO } from './create-goal.dto';

export class UpdateGoalDTO extends PartialType(CreateGoalDTO) {}
