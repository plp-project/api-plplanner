import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date;
}
