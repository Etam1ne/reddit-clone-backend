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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UpdateUserDto } from 'src/common/dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';
import { Community } from '../community/entities/community.entity';
import { Article } from '../article/entities/article.entity';
import { ApiOperation } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserAccessGuard } from 'src/common/guards/user-access.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  public create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @UseGuards(UserAccessGuard)
  @ApiOperation({ description: 'Follow community' })
  @Patch(':userId')
  public followCommunity(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('communityId', ParseUUIDPipe) communityId: string,
  ): Promise<User> {
    return this.service.followCommunity(userId, communityId);
  }

  @ApiOperation({ description: 'Get all users'})
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
    return this.service.getArticles(userId);
  }

  @UseGuards(UserAccessGuard)
  @Put(':userId')
  public update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(userId, updateUserDto);
  }

  @UseGuards(UserAccessGuard)
  @Delete(':userId')
  public delete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<DeleteResult> {
    return this.service.delete(userId);
  }
}
