import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { GoalService } from '../goal.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { CreateGoalDTO } from './dto/create-goal.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UpdateGoalDTO } from './dto/update-goal.dto';

@Controller('goal')
@ApiTags('Goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post(':categoryId')
  @ApiOperation({ summary: 'Create a goal' })
  @Auth()
  async create(
    @UserId() userId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() goal: CreateGoalDTO
  ) {
    return await this.goalService.create(userId, categoryId, goal);
  }

  @Get()
  @ApiOperation({ summary: 'Find all goals by user' })
  @Auth()
  async findAllByUser(@UserId() userId: number) {
    return await this.goalService.findAllByUser(userId);
  }

  @Get(':goalId')
  @ApiOperation({ summary: 'Find a goal by id' })
  @Auth()
  async findOneByUser(
    @UserId() userId: number,
    @Param('goalId', ParseIntPipe) goalId: number
  ) {
    return await this.goalService.findOneByUser(userId, goalId);
  }

  @Patch(':goalId')
  @ApiOperation({ summary: 'Update a goal' })
  @Auth()
  async update(
    @UserId() userId: number,
    @Param('goalId', ParseIntPipe) goalId: number,
    @Body() goal: UpdateGoalDTO
  ) {
    return await this.goalService.update(userId, goalId, goal);
  }

  @Delete(':goalId')
  @ApiOperation({ summary: 'Delete a goal' })
  @Auth()
  async deleteById(
    @UserId() userId: number,
    @Param('goalId', ParseIntPipe) goalId: number
  ) {
    return await this.goalService.delete(userId, goalId);
  }
}
