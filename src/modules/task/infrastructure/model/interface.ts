import { CategoryEntity } from 'src/modules/category/infrastructure/model';

export enum TaskStatus {
  EXECUTED = 'executed', //! Executada
  PARTIALLY_EXECUTED = 'partially_executed', //! Parcialmente executada
  POSTPONED = 'postponed' //! Adiada
}

export enum TaskDuration {
  HALF_HOUR = '30m',
  ONE_HOUR = '1h',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHT = 'night'
}

export interface ITaskEntity {
  description: string;
  status: TaskStatus;
  duration: TaskDuration;
  categoryId: number;
  planningId: number;
  category?: CategoryEntity;
}
