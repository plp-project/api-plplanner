import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlanningService } from '../planning.service';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { CreatePlanningDTO } from './dto/create-planning-dto';

@Controller('planning')
@ApiTags('Planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  @ApiOperation({ summary: 'Create a planning' })
  @Auth()
  async create(@UserId() userId: number, @Body() planning: CreatePlanningDTO) {
    return await this.planningService.create(userId, planning);
  }

  @Get()
  @ApiOperation({ summary: 'Find all plannings by userId' })
  @Auth()
  async findAll(@UserId() userId: number) {
    return await this.planningService.findAllByUser(userId);
  }
}
