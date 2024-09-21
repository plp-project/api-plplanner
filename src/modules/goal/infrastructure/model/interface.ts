export enum goalStatuses {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TODO = 'todo'
}

export interface IGoalEntity {
  status?: goalStatuses;
  description: string;
  duration: GoalDuration;
  date: Date;
  categoryId: number;
  userId: number;
}

export enum GoalDuration {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}
