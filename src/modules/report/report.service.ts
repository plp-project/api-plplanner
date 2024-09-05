import { Injectable } from '@nestjs/common';
import { GoalRepository } from '../goal/infrastructure/goal.repository';
import { TaskRepository } from '../task/infrastructure/task.repository';
import { CategoryRepository } from '../category/infrastructure/category.repository';
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
    private readonly categoryRepository: CategoryRepository,
    private readonly mathHelper: MathHelper
  ) {}

  async create(userId: number, date: CreateReportDTO) {
    const { initialDate, finalDate } = this.mathHelper.calculatePeriod(
      date.date,
      date.period
    );

    const goals = await this.goalRepository.find({
      userId: userId,
      createdAt: And(MoreThanOrEqual(initialDate), LessThanOrEqual(finalDate))
    });

    const goalsFineshed = goals.filter(
      (goal) => goal.status === goalStatus.SUCCESS
    );

    const goalsPercentage = this.mathHelper.calculatePercentage(
      goalsFineshed.length,
      goals.length
    );

    const tasks = await this.taskRepository.find(
      {
        planning: {
          userId: userId,
          createdAt: And(
            MoreThanOrEqual(initialDate),
            LessThanOrEqual(finalDate)
          )
        }
      },
      {
        planning: true
      }
    );

    const tasksFinished = tasks.filter(
      (task) => task.status === taskStatuses.EXECUTED
    );

    const tasksPercentage = this.mathHelper.calculatePercentage(
      tasksFinished.length,
      tasks.length
    );

    /* ! TODO
      Destacar as semanas e meses mais produtivos;
      Destacar os turnos mais produtivos;
      Quais as categorias de tarefa mais realizadas;
      Quais as categorias de metas mais realizadas;
    */

    return {
      goals: {
        total: goals.length,
        finished: goalsFineshed.length,
        percentage: goalsPercentage
      },
      tasks: {
        total: tasks.length,
        finished: tasksFinished.length,
        percentage: tasksPercentage
      }
    };
  }
}
