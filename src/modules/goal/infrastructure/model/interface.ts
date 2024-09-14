export enum GoalStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TODO = 'todo'
}

export interface IGoalEntity {
  description: string;
  duration: GoalDuration;
  date: Date;
  status?: GoalStatus;
  categoryId: number;
  userId: number;
}

export enum GoalDuration {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}
