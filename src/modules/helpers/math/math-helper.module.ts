import { Injectable } from '@nestjs/common';
import { GoalEntity } from 'src/modules/goal/infrastructure/model';
import { reportPeriods } from 'src/modules/report/interface/dto/create-report.dto';
import { TaskEntity } from 'src/modules/task/infrastructure/model';

@Injectable()
export class MathHelper {
  calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    return (part / total) * 100;
  }

  calculatePeriod(
    date: Date,
    period: reportPeriods
  ): { initialDate: Date; finalDate: Date } {
    switch (period) {
      case reportPeriods.WEEKLY:
        return this.calculateWeeklyPeriod(date);
      case reportPeriods.MONTHLY:
        return this.calculateMonthlyPeriod(date);
      case reportPeriods.YEARLY:
        return this.calculateYearlyPeriod(date);
      default:
        throw new Error('Invalid period');
    }
  }

  taskCategoriesMostFinished(tasks: TaskEntity[]): string[] {
    const categoryMap: { [key: number]: string } = {};
    tasks.forEach((task) => {
      if (task.category) {
        categoryMap[task.category.id] = task.category.name;
      }
    });

    const categoryCount: { [key: number]: number } = {};
    tasks.forEach((task) => {
      const categoryId = task.category?.id;
      if (categoryId) {
        categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
      }
    });

    const sortedCategoryIds = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[Number(b)] - categoryCount[Number(a)]
    );

    return sortedCategoryIds.map((id) => categoryMap[Number(id)]);
  }

  goalCategoriesMostFinished(goals: GoalEntity[]): string[] {
    const categoryMap: { [key: number]: string } = {};
    goals.forEach((goal) => {
      if (goal.category) {
        categoryMap[goal.category.id] = goal.category.name;
      }
    });

    const categoryCount: { [key: number]: number } = {};
    goals.forEach((goal) => {
      const categoryId = goal.category?.id;
      if (categoryId) {
        categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
      }
    });

    const sortedCategoryIds = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[Number(b)] - categoryCount[Number(a)]
    );

    return sortedCategoryIds.map((id) => categoryMap[Number(id)]);
  }

  weeksMostProductives(tasks: TaskEntity[], goals: GoalEntity[]) {
    const weekMap: { [key: string]: number } = {};
    tasks
      .concat(
        goals.map(
          (goal) => ({ ...goal, planningId: goal.id }) as unknown as TaskEntity
        )
      )
      .forEach((task) => {
        const week = this.getWeek(task.createdAt);
        weekMap[week] = (weekMap[week] || 0) + 1;
      });

    const sortedWeeks = Object.keys(weekMap).sort(
      (a, b) => weekMap[b] - weekMap[a]
    );

    return sortedWeeks;
  }

  monthsMostProductives(tasks: TaskEntity[], goals: GoalEntity[]) {
    const monthMap: { [key: string]: number } = {};
    tasks
      .concat(
        goals.map(
          (goal) => ({ ...goal, planningId: goal.id }) as unknown as TaskEntity
        )
      )
      .forEach((task) => {
        const month = this.getMonth(task.createdAt);
        monthMap[month] = (monthMap[month] || 0) + 1;
      });

    const sortedMonths = Object.keys(monthMap).sort(
      (a, b) => monthMap[b] - monthMap[a]
    );

    return sortedMonths;
  }

  shiftsMostProductives(goals: GoalEntity[]) {
    const shiftMap: { [key: string]: number } = {};
    goals.forEach((goal) => {
      const shift = goal.date.toISOString();
      shiftMap[shift] = (shiftMap[shift] || 0) + 1;
    });

    const sortedShifts = Object.keys(shiftMap).sort(
      (a, b) => shiftMap[b] - shiftMap[a]
    );

    return sortedShifts;
  }

  private getMonth(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month).toISOString();
  }

  private getWeek(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const week = new Date(year, month, day);
    week.setDate(day - week.getDay());
    return week.toISOString();
  }

  private calculateWeeklyPeriod(date: Date): {
    initialDate: Date;
    finalDate: Date;
  } {
    const initialDate = new Date(date);
    const finalDate = new Date(date);

    initialDate.setDate(date.getDate() - date.getDay());
    finalDate.setDate(date.getDate() + (6 - date.getDay()));

    return { initialDate, finalDate };
  }

  private calculateMonthlyPeriod(date: Date): {
    initialDate: Date;
    finalDate: Date;
  } {
    const initialDate = new Date(date);
    const finalDate = new Date(date);

    initialDate.setDate(1);
    finalDate.setMonth(date.getMonth() + 1);
    finalDate.setDate(0);

    return { initialDate, finalDate };
  }

  private calculateYearlyPeriod(date: Date): {
    initialDate: Date;
    finalDate: Date;
  } {
    const initialDate = new Date(date);
    const finalDate = new Date(date);

    initialDate.setMonth(0);
    initialDate.setDate(1);
    finalDate.setMonth(11);
    finalDate.setDate(31);

    return { initialDate, finalDate };
  }
}
