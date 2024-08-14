export enum categories {
  GOAL = 'goal', //! Meta
  TASK = 'task'
}

export enum goalStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PARTIALLY_SUCCESS = 'partially_success',
  TODO = 'todo'
}

export interface IGoalEntity {
  name: string;
  type: categories;
  categoryId: number;
  userId: number;
  status?: goalStatus | null;
}
