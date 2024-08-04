import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  ValidateIf
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserEntity } from '../../infrastructure/model/interface';

export class UpdateUserDTO implements Partial<IUserEntity> {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(3, 60)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @ValidateIf((data) => data.oldPassword)
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  })
  password?: string;

  @ApiProperty()
  @ValidateIf((data) => data.newPassword)
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  })
  oldPassword?: string;
}
