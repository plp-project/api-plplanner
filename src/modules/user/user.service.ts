import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { CreateUserDTO } from './interface/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDTO) {
    const userExists = await this.userRepository.exists({
      email: user.email
    });

    if (userExists) {
      throw new ConflictException('User already exists.');
    }

    return this.userRepository.create(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    return this.userRepository.findOne({ id });
  }
}
