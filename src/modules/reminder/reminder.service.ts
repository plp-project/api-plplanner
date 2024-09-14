import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ReminderRepository } from './infrastructure/reminder.repository';
import { CreateReminderDTO } from './interface/dto/create-reminder.dto';
import { UpdateReminderDTO } from './interface/dto/update-reminder.dto';

@Injectable()
export class ReminderService {
  constructor(
    private readonly reminderRepository: ReminderRepository,
    private readonly userService: UserService
  ) {}

  async create(userId: number, reminder: CreateReminderDTO) {
    await this.userService.findOneById(userId);
    return await this.reminderRepository.create({ ...reminder, userId });
  }

  async findAllByUser(userId: number) {
    return await this.reminderRepository.find({ userId });
  }

  async findOneById(id: number) {
    const reminder = await this.reminderRepository.findOne({ id });
    if (!reminder) throw new NotFoundException('Reminder not found.');
    return reminder;
  }

  async findOneByUser(userId: number, reminderId: number) {
    const reminder = await this.reminderRepository.findOne({
      id: reminderId,
      userId
    });

    if (!reminder) throw new NotFoundException('Reminder not found.');
    return reminder;
  }

  async update(userId: number, reminderId: number, data: UpdateReminderDTO) {
    await this.findOneByUser(userId, reminderId);
    return await this.reminderRepository.updateById(reminderId, data);
  }

  async delete(userId: number, reminderId: number) {
    await this.findOneByUser(userId, reminderId);
    return await this.reminderRepository.deleteById(reminderId);
  }
}
