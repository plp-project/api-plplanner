import { Injectable } from '@nestjs/common';
import { GoalRepository } from '../goal/infrastructure/goal.repository';
import { TaskRepository } from '../task/infrastructure/task.repository';
import { MathHelper } from '../helpers/math/math-helper';
import { CreateReportDTO } from './interface/dto/create-report.dto';
import { goalStatuses } from '../goal/infrastructure/model/interface';
import { LessThanOrEqual, MoreThanOrEqual, And } from 'typeorm';
import { taskStatuses } from '../task/infrastructure/model/interface';
import { CategoryEntity } from '../category/infrastructure/model';
import { TaskEntity } from '../task/infrastructure/model';
import { GetReportDTO } from './interface/dto/get-report.dto';
import { CategoriesReportInfoDTO } from './interface/dto/categories-report.dto';
import {
  GoalsReportInfoDTO,
  TasksReportInfoDTO
} from './interface/dto/entity-report-dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly taskRepository: TaskRepository,
    private readonly mathHelper: MathHelper
  ) {}

  async create(
    userId: number,
    createReportDTO: CreateReportDTO
  ): Promise<GetReportDTO> {
    const { initialDate, finalDate } = this.mathHelper.calculatePeriod(
      createReportDTO.date,
      createReportDTO.period
    );

    const goals = await this.getGoalsInfo(userId, initialDate, finalDate);
    const tasks = await this.getTasksInfo(userId, initialDate, finalDate);

    const datesGoal = goals.finished.map((goal) => goal.date);
    const datesTask = tasks.finished.map((task) => task.planning.day);
    const dates = datesGoal.concat(datesTask);

    const weeksMostProductives = this.getMostProductiveWeeks(dates);
    const monthsMostProductives = this.getMostProductiveMonths(dates);
    const shiftsMostProductives = this.getMostProductiveShifts(tasks.finished);

    const mostProductives = {
      weeks: weeksMostProductives,
      months: monthsMostProductives,
      shifts: shiftsMostProductives
    };

    const report = new GetReportDTO(
      initialDate,
      finalDate,
      goals,
      tasks,
      mostProductives
    );

    return report;
  }

  private async getGoalsInfo(
    userId: number,
    initialDate: Date,
    finalDate: Date
  ): Promise<GoalsReportInfoDTO> {
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

    const categoriesMostFinished = this.getCategoriesMostFinished(
      finished.map((goal) => goal.category)
    );

    return {
      all: goals,
      finished,
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
  ): Promise<TasksReportInfoDTO> {
    const tasks = await this.taskRepository.find(
      {
        planning: {
          userId,
          day: And(MoreThanOrEqual(initialDate), LessThanOrEqual(finalDate))
        }
      },
      { planning: true }
    );

    const finished = tasks.filter(
      (task) => task.status === taskStatuses.EXECUTED
    );

    const percentage = this.mathHelper.calculatePercentage(
      finished.length,
      tasks.length
    );

    const categoriesMostFinished = this.getCategoriesMostFinished(
      finished.map((task) => task.category)
    );

    return {
      all: tasks,
      finished,
      percentage,
      categories: {
        mostFinished: categoriesMostFinished
      }
    };
  }

  private getCategoriesMostFinished(
    categories: CategoryEntity[]
  ): CategoriesReportInfoDTO[] {
    const categoriesMap = this.mathHelper.countOccurrences(
      categories,
      (category) => category.name
    );

    const sortedCategories = this.mathHelper.sortMap(categoriesMap, 'category');
    return sortedCategories;
  }

  private getMostProductiveWeeks(dates: Date[]) {
    const keyExtractor = (date: Date) => {
      const range = this.mathHelper.getRangeOfWeek(date);
      const weekOfYear = this.mathHelper.getWeekOfYear(date);
      return { weekOfYear, start: range.startOfWeek, end: range.endOfWeek };
    };

    const periodsMap = this.mathHelper.countOccurrences(dates, keyExtractor);
    const sortedPeriods = this.mathHelper.sortMap(periodsMap, 'week');
    return sortedPeriods;
  }

  private getMostProductiveMonths(dates: Date[]) {
    const keyExtractor = (date: Date) => this.mathHelper.getMonthOfYear(date);
    const periodsMap = this.mathHelper.countOccurrences(dates, keyExtractor);

    const sortedPeriods = this.mathHelper.sortMap(periodsMap, 'month');
    return sortedPeriods;
  }

  private getMostProductiveShifts(tasks: TaskEntity[]) {
    const shiftsMap = this.mathHelper.countOccurrences(
      tasks,
      (task: TaskEntity) => task.duration
    );

    const sortedShifts = this.mathHelper.sortMap(shiftsMap, 'shift');
    return sortedShifts;
  }
}
