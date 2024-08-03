export enum categories {
  GOAL = 'goal', //! Meta
  TASK = 'task'
}

export enum goalStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success'
}

export interface IGoalEntity {
  name: string;
  type: categories;
  categoryId: number;
  status: goalStatus;
}
