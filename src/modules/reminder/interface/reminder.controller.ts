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
import { ReminderService } from '../reminder.service';
import { CreateReminderDTO } from './dto/create-reminder.dto';
import { UpdateReminderDTO } from './dto/update-reminder.dto';

@Auth()
@Controller('reminder')
@ApiTags('Reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reminder' })
  async create(@UserId() userId: number, @Body() reminder: CreateReminderDTO) {
    return await this.reminderService.create(userId, reminder);
  }

  @Get()
  @ApiOperation({ summary: 'Find all reminders by user' })
  async findAll(@UserId() userId: number) {
    return await this.reminderService.findAllByUser(userId);
  }

  @Get(':reminderId')
  @ApiOperation({ summary: 'Find a reminder' })
  async findOne(
    @UserId() userId: number,
    @Param('reminderId', ParseIntPipe) reminderId: number
  ) {
    return await this.reminderService.findOneByUser(userId, reminderId);
  }

  @Patch(':reminderId')
  @ApiOperation({ summary: 'Update a reminder' })
  async update(
    @UserId() userId: number,
    @Param('reminderId', ParseIntPipe) reminderId: number,
    @Body() reminder: UpdateReminderDTO
  ) {
    return await this.reminderService.update(userId, reminderId, reminder);
  }

  @Delete(':reminderId')
  @ApiOperation({ summary: 'Delete a reminder' })
  async delete(
    @UserId() userId: number,
    @Param('reminderId', ParseIntPipe) reminderId: number
  ) {
    return await this.reminderService.delete(userId, reminderId);
  }
}
