import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ description: 'Login Email', required: true, type: String })
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Login Password', required: true, type: String })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
