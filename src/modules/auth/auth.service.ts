import { Injectable } from '@nestjs/common';
import { LoginDTO } from './interface/dto/login.dto';
import { UserRepository } from '../user/infrastructure/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(login: LoginDTO): Promise<string> {
    console.log(login);
    return 'Hello World!';
  }
}
