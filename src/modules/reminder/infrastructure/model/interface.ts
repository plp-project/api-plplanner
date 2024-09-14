export enum ReminderType {
  CALL = 'call',
  MEETING = 'meeting',
  SHOPPING = 'shopping'
}

export interface IReminderEntity {
  description: string;
  type: ReminderType;
  date: Date;
  userId: number;
}
