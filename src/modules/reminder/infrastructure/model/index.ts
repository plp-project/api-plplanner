import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IReminderEntity, reminderTypes } from './interface';

@Entity({ name: 'reminder' })
export class ReminderEntity implements IReminderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: reminderTypes })
  type: reminderTypes;

  @Column({ type: Date })
  creationDate: Date;
}
