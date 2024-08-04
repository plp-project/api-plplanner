import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from '../auth.service';
import { Auth } from '../decorators/auth.decorator';
import { UserId } from '../decorators/user-id.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @Auth()
  @Get('profile')
  @ApiOperation({ summary: 'Get user authenticated' })
  async authenticated(@UserId() userId: number) {
    return await this.authService.authenticated(userId);
  }
}
