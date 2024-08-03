import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserEntity } from '../../infrastructure/model/interface';

export class CreateUserDTO implements Partial<IUserEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 60)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  })
  readonly password: string;
}
