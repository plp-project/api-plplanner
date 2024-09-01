import { Injectable } from '@nestjs/common';
import { reportPeriods } from 'src/modules/report/interface/dto/create-report.dto';

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
