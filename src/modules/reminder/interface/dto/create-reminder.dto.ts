import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length
} from 'class-validator';
import { ReminderEntity } from '../../infrastructure/model';
import { reminderTypes } from '../../infrastructure/model/interface';

export class CreateReminderDTO implements Partial<ReminderEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 255)
  @IsString()
  readonly description: string;

  @ApiProperty({ enum: reminderTypes })
  @IsNotEmpty()
  @IsEnum(reminderTypes)
  readonly type: reminderTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;
}
