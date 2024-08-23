import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { GoalService } from '../goal.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { CreateGoalDTO } from './dto/create-goal-dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

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
  @ApiOperation({ summary: 'Find all goals by userId' })
  @Auth()
  async findAll(@UserId() userId: number) {
    return await this.goalService.findAll(userId);
  }
}
