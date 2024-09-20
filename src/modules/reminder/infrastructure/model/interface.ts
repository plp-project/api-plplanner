export enum reminderTypes {
  CALL = 'call',
  MEETING = 'meeting',
  SHOPPING = 'shopping'
}

export interface IReminderEntity {
  description: string;
  type: reminderTypes;
  date: Date;
  userId: number;
}
