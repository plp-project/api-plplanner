import { TaskEntity } from 'src/modules/task/infrastructure/model';

export interface IPlanningEntity {
  tasks: TaskEntity[];
  day: Date;
}
