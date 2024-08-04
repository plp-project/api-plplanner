import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  ValidateIf
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IUserEntity } from '../../infrastructure/model/interface';

export class UpdateUserDTO implements Partial<IUserEntity> {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(3, 60)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
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

  @ApiPropertyOptional()
  @ValidateIf((data) => data.password)
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
