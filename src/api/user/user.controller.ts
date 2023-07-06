import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/shared/dtos/create-user.dto';
import { UpdateUserDto } from 'src/shared/dtos/update-user.dto';
import { User } from 'src/infra/postgres/entities/user.entity';
import { UserService } from 'src/core/services/user.service';
import { DeleteResult } from 'typeorm';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { Article } from 'src/infra/postgres/entities/article.entity';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  public create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Patch(':userId')
  public followCommunity(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('communityId', ParseUUIDPipe) communityId: string,
  ): Promise<User> {
    return this.service.followCommunity(userId, communityId);
  }

  @Get()
  public getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get(':userId')
  public getById(@Param('userId', ParseUUIDPipe) userId: string): Promise<User> {
    return this.service.getById(userId);
  }

  @Get(':userId/followedCommunities')
  public getFollowedCommunities(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Community[]> {
    return this.service.getFollowedCommunities(userId);
  }

  @Get(':userId/articles')
  public getPosts(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Article[]> {
    return this.getPosts(userId);
  }

  @Put(':userId')
  public update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(userId, updateUserDto);
  }

  @Delete(':userId')
  public delete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<DeleteResult> {
    return this.service.delete(userId);
  }
}
