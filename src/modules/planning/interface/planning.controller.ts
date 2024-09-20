import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlanningService } from '../planning.service';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { CreatePlanningDTO } from './dto/create-planning-dto';
import { UpdatePlanningDTO } from './dto/update-planning.dto';
import { FindAllPlanningsQueryDTO } from './dto/find-all-planning-dto';

@Auth()
@Controller('planning')
@ApiTags('Planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  @ApiOperation({ summary: 'Create a planning' })
  async create(@UserId() userId: number, @Body() planning: CreatePlanningDTO) {
    return await this.planningService.create(userId, planning);
  }

  @Get()
  @ApiOperation({ summary: 'Find all plannings by user' })
  async findAll(
    @UserId() userId: number,
    @Query('period') period?: FindAllPlanningsQueryDTO
  ) {
    return await this.planningService.findAllByUser(userId, period.period);
  }

  @Get(':planningId')
  @ApiOperation({ summary: 'Find a planning' })
  async findOne(
    @UserId() userId: number,
    @Param('planningId', ParseIntPipe) planningId: number
  ) {
    return await this.planningService.findOneByUser(userId, planningId);
  }

  @Patch(':planningId')
  @ApiOperation({ summary: 'Update a planning' })
  async update(
    @UserId() userId: number,
    @Param('planningId', ParseIntPipe) planningId: number,
    @Body() planning: UpdatePlanningDTO
  ) {
    return await this.planningService.update(userId, planningId, planning);
  }

  @Delete(':planningId')
  @ApiOperation({ summary: 'Delete a planning' })
  async delete(
    @UserId() userId: number,
    @Param('planningId', ParseIntPipe) planningId: number
  ) {
    return await this.planningService.delete(userId, planningId);
  }
}
