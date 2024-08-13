import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { categories, goalStatus, IGoalEntity } from './interface';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';
import { UserEntity } from 'src/modules/user/infrastructure/model';

@Entity({ name: 'goal' })
export class GoalEntity implements IGoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: categories })
  type: categories;

  @Column({ type: 'enum', enum: goalStatus, nullable: true })
  status: goalStatus | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  categoryId: number;

  @OneToOne(() => CategoryEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  category: CategoryEntity;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  user: UserEntity;
}
