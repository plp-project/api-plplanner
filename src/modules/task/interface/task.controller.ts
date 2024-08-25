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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { TaskService } from '../task.service';
import { CreateTaskDTO } from './dto/create-task-dto';
import { UpdateTaskDTO } from './dto/update-task-dto';

@Auth()
@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':planningId')
  @ApiOperation({ summary: 'Create a task' })
  async create(
    @UserId() userId: number,
    @Param('planningId', ParseIntPipe) planningId: number,
    @Body() task: CreateTaskDTO
  ) {
    return await this.taskService.create(userId, planningId, task);
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Find a task' })
  async findOne(
    @UserId() userId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ) {
    return await this.taskService.findOneByUser(userId, taskId);
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Update a task' })
  async update(
    @UserId() userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() data: UpdateTaskDTO
  ) {
    return await this.taskService.update(userId, taskId, data);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete a task' })
  async delete(
    @UserId() userId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ) {
    return await this.taskService.delete(userId, taskId);
  }
}
