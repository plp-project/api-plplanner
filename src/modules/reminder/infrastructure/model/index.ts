import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IReminderEntity, ReminderTypes } from './interface';

@Entity({ name: 'reminder' })
export class ReminderEntity implements IReminderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ReminderTypes })
  type: ReminderTypes;

  @Column({ type: Date })
  creationDate: Date;
}
