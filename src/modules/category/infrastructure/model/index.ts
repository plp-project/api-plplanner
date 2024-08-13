import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from 'src/modules/user/infrastructure/model';
import { categories, ICategoryEntity } from './interface';

@Entity({ name: 'category' })
export class CategoryEntity implements ICategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: categories })
  type: categories;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
