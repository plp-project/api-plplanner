import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IReminderEntity, ReminderType } from './interface';
import { UserEntity } from 'src/modules/user/infrastructure/model';

@Entity({ name: 'reminder' })
export class ReminderEntity implements IReminderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ReminderType })
  type: ReminderType;

  @Column()
  date: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
