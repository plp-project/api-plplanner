export enum categories {
  GOAL = 'goal', //! Meta
  TASK = 'task'
}

export enum goalStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TO_DO = "to_do"
}

export interface IGoalEntity {
  name: string;
  type: categories;
  categoryId: number,
  userId: number,
  status: goalStatus;
}
