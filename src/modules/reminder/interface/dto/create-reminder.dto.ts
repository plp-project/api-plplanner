import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length
} from 'class-validator';
import { ReminderEntity } from '../../infrastructure/model';
import { ReminderType } from '../../infrastructure/model/interface';

export class CreateReminderDTO implements Partial<ReminderEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 255)
  @IsString()
  readonly description: string;

  @ApiProperty({ enum: ReminderType })
  @IsNotEmpty()
  @IsEnum(ReminderType)
  readonly type: ReminderType;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;
}
