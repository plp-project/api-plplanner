import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() user: CreateUserDTO) {
    return await this.userService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOneById(id);
  }

  @Auth()
  @Patch()
  @ApiOperation({ summary: 'Update user by ID' })
  async updateById(@UserId() id: number, @Body() updateInfo: UpdateUserDTO) {
    return await this.userService.updateById(id, updateInfo);
  }
}
