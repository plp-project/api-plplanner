import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { CreateUserDTO } from './interface/dto/create-user.dto';
import { BcryptHelper } from '../helpers/bcrypt/bcrypt-helper.module';
import { UpdateUserDTO } from './interface/dto/update-user.dto';

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

    const password = this.bcrypt.encrypt(user.password);

    return this.userRepository.create({ ...user, password });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
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

  async updateById(id: number, data: UpdateUserDTO) {
    const { email, password, oldPassword } = data;
    const user = await this.findOneById(id);

    if (email && email !== user.email) {
      const emailInUse = await this.userRepository.exists({ email });
      if (emailInUse) {
        throw new ConflictException('User already exists with this email.');
      }
    }

    if (oldPassword && password) {
      const passwordMatch = this.bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        throw new ConflictException('Old password does not match.');
      }
      data.password = this.bcrypt.encrypt(password);
    }

    delete data.oldPassword;

    return await this.userRepository.updateById(id, data);
  }
}
