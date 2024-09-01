import { Injectable } from '@nestjs/common';

@Injectable()
export class MathHelper {
  calculatePercentage(part: number, total: number): number {
    if (total === 0) {
      throw new Error('The total value cannot be zero');
    }
    if (part < 0 || total < 0) {
      throw new Error('Values ​​cannot be negative');
    }

    return (part / total) * 100;
  }
}
