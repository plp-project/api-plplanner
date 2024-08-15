import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from 'src/modules/user/infrastructure/model';
import { ICategoryEntity } from './interface';

@Entity({ name: 'category' })
export class CategoryEntity implements ICategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
