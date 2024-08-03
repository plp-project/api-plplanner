import { CategoryEntity } from 'src/modules/category/infrastructure/model';

export enum taskStatus {
  EXECUTED = 'executed', //! Executada
  PARTIALLY_EXECUTED = 'partially_executed', //! Parcialmente executada
  POSTPONED = 'postponed' //! Adiada
}

export enum durations {
  HALF_HOUR = '30m',
  ONE_HOUR = '1h',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHT = 'night'
}

export interface ITaskEntity {
  description: string;
  status: taskStatus;
  duration: durations;
  categoryId: number;
  planningId: number;
  category?: CategoryEntity;
}
