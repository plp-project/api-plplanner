export enum goalStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TODO = 'todo'
}

export interface IGoalEntity {
  name: string;
  status?: goalStatus;
  categoryId: number;
  userId: number;
}
