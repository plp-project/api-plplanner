import { TaskEntity } from 'src/modules/task/infrastructure/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IPlanningEntity } from './interface';

@Entity({ name: 'planning' })
export class PlanningEntity implements IPlanningEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Date })
  day: Date;

  @OneToMany(() => TaskEntity, (task) => task.planning)
  tasks: TaskEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
