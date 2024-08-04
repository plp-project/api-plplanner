import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './interface/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BcryptHelper } from '../helpers/bcrypt/bcrypt-helper.module';
import { JwtPayloadDTO } from './interface/dto/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcrypt: BcryptHelper,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(login: LoginDTO): Promise<{ token: string }> {
    const { email, password } = login;

    const user = await this.userService.findByEmail(email).catch(() => null);
    const validPassword = this.bcrypt.compare(password, user?.password);

    if (!user || !validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = new JwtPayloadDTO(user);
    const token = await this.jwtService.signAsync({ ...payload });

    return { token };
  }

  async authenticated(userId: number) {
    const user = await this.userService.findById(userId);
    return user;
  }
}
