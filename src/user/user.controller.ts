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

  @Get()
  public getAll() {
    return this.service.getAll();
  }

  @Get(':userId')
  public getById(@Param('userId', ParseIntPipe) id: number): Promise<User> {
    return this.service.getById(id);
  }

  @Get(':userId/followedCommunities')
  public getFollowedCommunities(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getFollowedCommunities(userId);
  }

  @Post()
  public create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Post(':userId/follows/:communityId')
  public followCommunity(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('communityId', ParseIntPipe) communityId: number,
  ) {
    return this.service.followCommunity(userId, communityId);
  }
}
