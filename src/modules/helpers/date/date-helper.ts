import { Injectable } from '@nestjs/common';
import { planningPeriods } from 'src/modules/planning/interface/dto/find-all-planning-dto';

@Injectable()
export class DateHelper {
  calculatePeriod(
    date: Date,
    period: planningPeriods
  ): { initialDate: Date; finalDate: Date } {
    switch (period) {
      case planningPeriods.WEEKLY:
        return this.calculateWeeklyPeriod(date);
      case planningPeriods.MONTHLY:
        return this.calculateMonthlyPeriod(date);
      case planningPeriods.YEARLY:
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
