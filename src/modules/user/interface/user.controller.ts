import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Auth()
  @Patch(':id')
  @ApiOperation({ summary: 'Edit user by ID' })
  editById(@Param('id') id: number, @Body() editInfo: UpdateUserDTO) {
    return this.userService.updateById(id, editInfo);
  }
}
