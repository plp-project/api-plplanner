import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { durations, ITaskEntity, taskStatus } from './interface';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';
import { PlanningEntity } from 'src/modules/planning/infrastructure/model';

@Entity({ name: 'task' })
export class TaskEntity implements ITaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: taskStatus
  })
  status: taskStatus;

  @Column({ type: 'enum', enum: durations })
  duration: durations;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  categoryId: number;

  @OneToOne(() => CategoryEntity)
  @JoinColumn()
  category?: CategoryEntity;

  @Column()
  planningId: number;

  @ManyToOne(() => PlanningEntity, (planning) => planning.tasks)
  planning?: PlanningEntity;
}
