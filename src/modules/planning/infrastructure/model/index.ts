import { TaskEntity } from 'src/modules/task/infrastructure/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IPlanningEntity } from './interface';
import { UserEntity } from 'src/modules/user/infrastructure/model';

@Entity({ name: 'planning' })
export class PlanningEntity implements IPlanningEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: Date;

  @Column()
  userId: number;

  @OneToMany(() => TaskEntity, (task) => task.planning, { cascade: true })
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.plannings)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
