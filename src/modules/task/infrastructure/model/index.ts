import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ITaskEntity, taskDurations, taskStatuses } from './interface';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';
import { PlanningEntity } from 'src/modules/planning/infrastructure/model';

@Entity({ name: 'task' })
export class TaskEntity implements ITaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  description: string;

  @Column({ type: 'enum', enum: taskStatuses })
  status: taskStatuses;

  @Column({ type: 'enum', enum: taskDurations })
  duration: taskDurations;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryEntity, { eager: true })
  category?: CategoryEntity;

  @Column()
  planningId: number;

  @ManyToOne(() => PlanningEntity, (planning) => planning.tasks, {
    onDelete: 'CASCADE'
  })
  planning?: PlanningEntity;

  @CreateDateColumn()
  createdAt: Date;
}
