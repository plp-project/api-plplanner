import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IUserEntity } from './interface';
import { GoalEntity } from 'src/modules/goal/infrastructure/model';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';

@Entity({ name: 'user' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => GoalEntity, (goal) => goal.user)
  goals: GoalEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];
}
