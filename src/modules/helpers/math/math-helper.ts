import { Injectable } from '@nestjs/common';
import { GoalEntity } from 'src/modules/goal/infrastructure/model';
import { reportPeriods } from 'src/modules/report/interface/dto/create-report.dto';
import { TaskEntity } from 'src/modules/task/infrastructure/model';

@Injectable()
export class MathHelper {
  calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    const percentage = (part / total) * 100;
    return Math.round(percentage * 100) / 100;
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

  private calculateWeeklyPeriod(date: Date): {
    initialDate: Date;
    finalDate: Date;
  } {
    const initialDate = new Date(date);
    const finalDate = new Date(date);

    finalDate.setDate(finalDate.getDate() + 7);

    return {
      initialDate: initialDate,
      finalDate: finalDate
    };
  }

  private calculateMonthlyPeriod(date: Date): {
    initialDate: Date;
    finalDate: Date;
  } {
    const initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const finalDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return { initialDate, finalDate };
  }

  private calculateYearlyPeriod(date: Date): {
    initialDate: Date;
    finalDate: Date;
  } {
    const initialDate = new Date(date.getFullYear(), 0, 1);
    const finalDate = new Date(date.getFullYear(), 11, 31);

    return { initialDate, finalDate };
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
}
