export enum ReminderTypes {
  CALL = 'call',
  MEETING = 'meeting',
  SHOPPING = 'shopping'
}

export interface IReminderEntity {
  type: ReminderTypes;
  creationDate: Date;
}
