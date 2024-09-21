import { Injectable } from '@nestjs/common';
import { GoalRepository } from '../goal/infrastructure/goal.repository';
import { TaskRepository } from '../task/infrastructure/task.repository';
import { MathHelper } from '../helpers/math/math-helper';
import { CreateReportDTO } from './interface/dto/create-report.dto';
import { goalStatuses } from '../goal/infrastructure/model/interface';
import { LessThanOrEqual, MoreThanOrEqual, And } from 'typeorm';
import { taskStatuses } from '../task/infrastructure/model/interface';

@Injectable()
export class ReportService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly taskRepository: TaskRepository,
    private readonly mathHelper: MathHelper
  ) {}

  async create(userId: number, createReportDTO: CreateReportDTO) {
    const { initialDate, finalDate } = this.mathHelper.calculatePeriod(
      createReportDTO.date,
      createReportDTO.period
    );

    const goalsInfo = await this.getGoalsInfo(userId, initialDate, finalDate);
    const tasksInfo = await this.getTasksInfo(userId, initialDate, finalDate);

    const weeksMostProductives = this.mathHelper.weeksMostProductives(
      tasksInfo.finished,
      goalsInfo.finished
    );

    const monthsMostProductives = this.mathHelper.monthsMostProductives(
      tasksInfo.finished,
      goalsInfo.finished
    );

    const shiftsMostProductives = this.mathHelper.shiftsMostProductives(
      tasksInfo.finished
    );

    return {
      initialDate,
      finalDate,
      goals: goalsInfo,
      tasks: tasksInfo,
      mostProductive: {
        weeks: weeksMostProductives,
        months: monthsMostProductives,
        shifts: shiftsMostProductives
      }
    };
  }

  private async getGoalsInfo(
    userId: number,
    initialDate: Date,
    finalDate: Date
  ) {
    const goals = await this.goalRepository.find({
      userId: userId,
      date: And(MoreThanOrEqual(initialDate), LessThanOrEqual(finalDate))
    });

    const finished = goals.filter(
      (goal) => goal.status === goalStatuses.SUCCESS
    );

    const percentage = this.mathHelper.calculatePercentage(
      finished.length,
      goals.length
    );

    const categoriesMostFinished =
      this.mathHelper.goalCategoriesMostFinished(finished);

    return {
      all: goals,
      finished,
      total: goals.length,
      percentage,
      categories: {
        mostFinished: categoriesMostFinished
      }
    };
  }

  private async getTasksInfo(
    userId: number,
    initialDate: Date,
    finalDate: Date
  ) {
    const tasks = await this.taskRepository.find({
      planning: {
        userId,
        day: And(MoreThanOrEqual(initialDate), LessThanOrEqual(finalDate))
      }
    });

    const finished = tasks.filter(
      (task) => task.status === taskStatuses.EXECUTED
    );

    const percentage = this.mathHelper.calculatePercentage(
      finished.length,
      tasks.length
    );

    const categoriesMostFinished =
      this.mathHelper.taskCategoriesMostFinished(finished);

    return {
      all: tasks,
      finished,
      total: tasks.length,
      percentage,
      categories: {
        mostFinished: categoriesMostFinished
      }
    };
  }
}
