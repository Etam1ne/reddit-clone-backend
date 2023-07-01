import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getById(id);
  }

  @Get()
  public getAllUsers() {
    return this.service.getAll();
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }
}
