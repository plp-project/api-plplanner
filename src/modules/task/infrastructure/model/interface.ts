import { CategoryEntity } from 'src/modules/category/infrastructure/model';

export enum taskStatuses {
  EXECUTED = 'executed', //! Executada
  PARTIALLY_EXECUTED = 'partially_executed', //! Parcialmente executada
  POSTPONED = 'postponed', //! Adiada
  TODO = 'todo'
}

export enum taskDurations {
  HALF_HOUR = '30m',
  ONE_HOUR = '1h',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHT = 'night'
}

export interface ITaskEntity {
  description: string;
  status: taskStatuses;
  duration: taskDurations;
  categoryId: number;
  planningId: number;
  category?: CategoryEntity;
}
