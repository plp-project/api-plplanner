import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { categories, goalStatus, IGoalEntity } from './interface';
import { CategoryEntity } from 'src/modules/category/infrastructure/model';

@Entity({ name: 'goal' })
export class GoalEntity implements IGoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: categories })
  type: categories;

  @Column()
  categoryId: number;

  @Column({ type: 'enum', enum: goalStatus })
  status: goalStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ referencedColumnName: 'id' })
  category: CategoryEntity;
}
