import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IReminderEntity, reminderTypes } from './interface';
import { UserEntity } from 'src/modules/user/infrastructure/model';

@Entity({ name: 'reminder' })
export class ReminderEntity implements IReminderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: reminderTypes })
  type: reminderTypes;

  @Column()
  description: string;

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
