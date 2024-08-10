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

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: categories })
  type: categories;

  @Column({ type: 'enum', enum: goalStatus })
  status: goalStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  categoryId: number;

  @Column()
  userId: number;

  @OneToOne(() => CategoryEntity, {createForeignKeyConstraints: false})
  @JoinColumn({name: 'categoryId'})
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  user: UserEntity;
}
