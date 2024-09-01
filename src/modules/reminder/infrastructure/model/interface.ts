export enum reminderTypes {
  CALL = 'call',
  MEETING = 'meeting',
  SHOPPING = 'shopping'
}

export interface IReminderEntity {
  type: reminderTypes;
  creationDate: Date;
}
