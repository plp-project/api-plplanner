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
    const weekMap: {
      [key: string]: { count: number; initialDate: string; finalDate: string };
    } = {};

    tasks
      .concat(
        goals.map(
          (goal) =>
            ({
              ...goal,
              planningId: goal.id,
              createdAt: goal.date
            }) as unknown as TaskEntity
        )
      )
      .forEach((task) => {
        const weekStart = this.getWeekStart(
          task.planning?.day || task.createdAt
        );
        const weekEnd = this.getWeekEnd(task.createdAt || task.planning?.day);

        const key = `${weekStart}-${weekEnd}`;
        weekMap[key] = weekMap[key] || {
          count: 0,
          initialDate: weekStart,
          finalDate: weekEnd
        };
        weekMap[key].count += 1;
      });

    const sortedWeeks = Object.keys(weekMap).sort(
      (a, b) => weekMap[b].count - weekMap[a].count
    );

    return sortedWeeks.map((key) => ({
      initialDate: weekMap[key].initialDate,
      finalDate: weekMap[key].finalDate
    }));
  }

  monthsMostProductives(tasks: TaskEntity[], goals: GoalEntity[]) {
    const monthMap: { [key: string]: number } = {};

    tasks
      .concat(
        goals.map(
          (goal) =>
            ({
              ...goal,
              planningId: goal.id,
              createdAt: goal.date
            }) as unknown as TaskEntity
        )
      )
      .forEach((task) => {
        const month = this.getMonthOnly(task.createdAt || task.planning?.day);
        monthMap[month] = (monthMap[month] || 0) + 1;
      });

    const sortedMonths = Object.keys(monthMap).sort(
      (a, b) => monthMap[b] - monthMap[a]
    );

    return sortedMonths;
  }

  shiftsMostProductives(tasks: TaskEntity[]) {
    const shiftMap: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const shift = task.duration;
      shiftMap[shift] = (shiftMap[shift] || 0) + 1;
    });

    const sortedShifts = Object.keys(shiftMap).sort(
      (a, b) => shiftMap[b] - shiftMap[a]
    );

    return sortedShifts.map((shift) => ({
      duration: shift,
      count: shiftMap[shift]
    }));
  }

  private getWeekStart(date: Date): string {
    const week = new Date(date);
    const day = week.getDate() - week.getDay();
    week.setDate(day);
    return week.toISOString();
  }

  private getMonthOnly(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month < 10 ? '0' + month : month}`;
  }

  private getWeekEnd(date: Date): string {
    const week = new Date(date);
    const day = week.getDate() - week.getDay() + 6;
    week.setDate(day);
    return week.toISOString();
  }
}
