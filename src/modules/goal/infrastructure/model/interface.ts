export enum GoalStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TODO = 'todo'
}

export interface IGoalEntity {
  name: string;
  status?: GoalStatus;
  categoryId: number;
  userId: number;
}
