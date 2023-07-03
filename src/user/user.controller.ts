import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';
import { Community } from 'src/community/community.entity';
import { Post as UsersPost } from 'src/post/post.entity';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  public create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Post(':userId/follows/:communityId')
  public followCommunity(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('communityId', ParseIntPipe) communityId: number,
  ): Promise<User> {
    return this.service.followCommunity(userId, communityId);
  }

  @Get()
  public getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get(':userId')
  public getById(@Param('userId', ParseIntPipe) id: number): Promise<User> {
    return this.service.getById(id);
  }

  @Get(':userId/followedCommunities')
  public getFollowedCommunities(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Community[]> {
    return this.service.getFollowedCommunities(userId);
  }

  @Get(':userId/posts')
  public getPosts(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UsersPost[]> {
    return this.getPosts(userId);
  }

  @Put(':userId')
  public update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(userId, updateUserDto);
  }

  @Delete(':userId')
  public delete(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DeleteResult> {
    return this.service.delete(userId);
  }
}
