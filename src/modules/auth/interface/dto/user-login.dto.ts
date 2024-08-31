import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IUserEntity } from 'src/modules/user/infrastructure/model/interface';

export class UserLoginDTO implements Partial<IUserEntity> {
  @ApiProperty({ description: 'User ID' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User created_at' })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Exclude()
  password?: string;
}
