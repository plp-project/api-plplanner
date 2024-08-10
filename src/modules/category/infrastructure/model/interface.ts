export enum categories {
  GOAL = 'goal', //! Meta
  TASK = 'task'
}

export interface ICategoryEntity {
  name: string;
  color: string;
  type: categories;
}
