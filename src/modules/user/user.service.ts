import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { CreateUserDTO } from './interface/dto/create-user.dto';
import { BcryptHelper } from '../helpers/bcrypt/bcrypt-helper.module';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcrypt: BcryptHelper
  ) {}

  async create(user: CreateUserDTO) {
    const userExists = await this.userRepository.exists({
      email: user.email
    });

    if (userExists) {
      throw new ConflictException('User already exists.');
    }

    const password = await this.bcrypt.encrypt(user.password);

    return this.userRepository.create({ ...user, password });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
