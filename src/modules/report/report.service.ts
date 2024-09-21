import { Injectable } from '@nestjs/common';
import { GoalRepository } from '../goal/infrastructure/goal.repository';
import { TaskRepository } from '../task/infrastructure/task.repository';
import { MathHelper } from '../helpers/math/math-helper.module';
import { CreateReportDTO } from './interface/dto/create-report.dto';
import { goalStatus } from '../goal/infrastructure/model/interface';
import { LessThanOrEqual, MoreThanOrEqual, And } from 'typeorm';
import { taskStatuses } from '../task/infrastructure/model/interface';

@Injectable()
export class ReportService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly taskRepository: TaskRepository,
    private readonly mathHelper: MathHelper
  ) {}

  async create(userId: number, date: CreateReportDTO) {
    const { initialDate, finalDate } = this.mathHelper.calculatePeriod(
      date.date,
      date.period
    );

    const { goals, goalsFinished, goalsPercentage } =
      await this.goalsOperations(userId, initialDate, finalDate);

    const { tasks, tasksFinished, tasksPercentage } =
      await this.tasksOperations(userId, initialDate, finalDate);

    const taskGategoriesMostFinished =
      this.mathHelper.taskCategoriesMostFinished(tasksFinished);

    const goalGategoriesMostFinished =
      this.mathHelper.goalCategoriesMostFinished(goalsFinished);

    const weeksMostProductives = this.mathHelper.weeksMostProductives(
      tasksFinished,
      goalsFinished
    );

    const monthsMostProductives = this.mathHelper.monthsMostProductives(
      tasksFinished,
      goalsFinished
    );

    const shiftsMostProductives =
      this.mathHelper.shiftsMostProductives(goalsFinished);

    return {
      goals: {
        total: goals.length,
        finished: goalsFinished.length,
        percentage: goalsPercentage,
        categories: {
          mostFinished: goalGategoriesMostFinished
        }
      },
      tasks: {
        total: tasks.length,
        finished: tasksFinished.length,
        percentage: tasksPercentage,
        categories: {
          mostFinished: taskGategoriesMostFinished
        }
      },
      mostProductive: {
        weeks: weeksMostProductives,
        months: monthsMostProductives,
        shifts: shiftsMostProductives
      }
    };
  }

  private async goalsOperations(
    userId: number,
    initialDate: Date,
    finalDate: Date
  ) {
    const goals = await this.goalRepository.find({
      userId: userId,
      createdAt: And(MoreThanOrEqual(initialDate), LessThanOrEqual(finalDate))
    });

    const goalsFinished = goals.filter(
      (goal) => goal.status === goalStatus.SUCCESS
    );

    const goalsPercentage = this.mathHelper.calculatePercentage(
      goalsFinished.length,
      goals.length
    );

    return { goals, goalsFinished, goalsPercentage };
  }

  private async tasksOperations(
    userId: number,
    initialDate: Date,
    finalDate: Date
  ) {
    const tasks = await this.taskRepository.find({
      planning: {
        userId: userId,
        createdAt: And(MoreThanOrEqual(initialDate), LessThanOrEqual(finalDate))
      }
    });

    const tasksFinished = tasks.filter(
      (task) => task.status === taskStatuses.EXECUTED
    );

    const tasksPercentage = this.mathHelper.calculatePercentage(
      tasksFinished.length,
      tasks.length
    );

    return { tasks, tasksFinished, tasksPercentage };
  }
}
