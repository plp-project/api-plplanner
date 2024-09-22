export enum goalStatuses {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TODO = 'todo'
}

export interface IGoalEntity {
  name: string;
  description: string;
  status?: goalStatuses;
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
