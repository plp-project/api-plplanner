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
  planningId: number;

  @Column()
  categoryId: number;

  @OneToOne(() => CategoryEntity)
  @JoinColumn()
  category?: CategoryEntity;

  @ManyToOne(() => CategoryEntity)
  planning?: CategoryEntity;
}
