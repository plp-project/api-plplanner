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

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: categories })
  type: categories;

  @CreateDateColumn()
  createdAt: Date;
}
