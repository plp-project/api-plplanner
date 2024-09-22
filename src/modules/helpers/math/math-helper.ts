import { Injectable } from '@nestjs/common';
import { reportPeriods } from 'src/modules/report/interface/dto/create-report.dto';
import * as moment from 'moment';

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

    return { initialDate, finalDate };
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

  getWeekOfYear(date: Date) {
    const week = moment(date).format('[Semana] W [de] Y');
    return week;
  }

  getMonthOfYear(date: Date) {
    const month = moment(date).format('M [de] Y');
    return month;
  }

  countOccurrences<T, K>(items: T[], keyExtractor: (item: T) => K) {
    const occurrencesMap = new Map<K, number>();

    items.forEach((item) => {
      const key = keyExtractor(item);
      occurrencesMap.set(key, (occurrencesMap.get(key) || 0) + 1);
    });

    return occurrencesMap;
  }

  sortMap<K, N extends string>(map: Map<K, number>, keyName: N) {
    return Array.from(map.entries())
      .map(([key, count]) => {
        return { [keyName]: key, count } as { [P in N]: K } & { count: number };
      })
      .sort((a, b) => b.count - a.count);
  }
}
