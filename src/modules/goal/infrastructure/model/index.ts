import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { GoalDuration, GoalStatus, IGoalEntity } from './interface';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';
import { UserEntity } from 'src/modules/user/infrastructure/model';

@Entity({ name: 'goal' })
export class GoalEntity implements IGoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: GoalDuration })
  duration: GoalDuration;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: GoalStatus, default: GoalStatus.TODO })
  status?: GoalStatus;

  @Column()
  categoryId: number;

  @OneToOne(() => CategoryEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  category: CategoryEntity;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
