import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from '../auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @ApiOperation({
    summary: 'Login',
  })
  async login(@Body() body: LoginDTO): Promise<string> {
    return await this.authService.login(body);
  }
}
