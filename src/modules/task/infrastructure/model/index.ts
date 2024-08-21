import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ITaskEntity, TaskDuration, TaskStatus } from './interface';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';
import { PlanningEntity } from 'src/modules/planning/infrastructure/model';

@Entity({ name: 'task' })
export class TaskEntity implements ITaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskDuration })
  duration: TaskDuration;

  @Column()
  categoryId: number;

  @OneToOne(() => CategoryEntity)
  @JoinColumn()
  category?: CategoryEntity;

  @Column()
  planningId: number;

  @ManyToOne(() => PlanningEntity, (planning) => planning.tasks)
  planning?: PlanningEntity;

  @CreateDateColumn()
  createdAt: Date;
}
