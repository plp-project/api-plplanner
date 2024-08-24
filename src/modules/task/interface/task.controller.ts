import {
  Body,
  Controller,
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

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':categoryId/:planningId')
  @ApiOperation({ summary: 'Create a task' })
  @Auth()
  async create(
    @UserId() userId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('planningId', ParseIntPipe) planningId: number,
    @Body() task: CreateTaskDTO
  ) {
    return await this.taskService.create(userId, categoryId, planningId, task);
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Update a task' })
  @Auth()
  async update(
    @UserId() userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() data: UpdateTaskDTO
  ) {
    return await this.taskService.update(userId, taskId, data);
  }
}
