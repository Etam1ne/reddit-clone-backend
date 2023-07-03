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
import { CommunityService } from './community.service';
import { CreateCommunityDto, UpdateCommunityDto } from './community.dto';
import { Community } from './community.entity';
import { User } from 'src/user/user.entity';
import { Post as UsersPost } from 'src/post/post.entity';
import { DeleteResult } from 'typeorm';

@Controller('communities')
export class CommunityController {
  constructor(private readonly service: CommunityService) {}

  @Post()
  public create(@Body() body: CreateCommunityDto): Promise<Community> {
    return this.service.create(body);
  }

  @Get()
  public getAll(): Promise<Community[]> {
    return this.service.getAll();
  }

  @Get(':communityId/posts')
  public getPosts(
    @Param('communityId', ParseIntPipe) communityId: number,
  ): Promise<UsersPost[]> {
    return this.service.getPosts(communityId);
  }

  @Put(':communityId')
  public updateInfo(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    return this.service.updateInfo(communityId, updateCommunityDto);
  }

  @Get(':communityId/followers')
  public getFollowers(
    @Param('communityId', ParseIntPipe) communityId: number,
  ): Promise<User[]> {
    return this.service.getFollowers(communityId);
  }

  @Delete(':communityId')
  public deleteCommunity(
    @Param('communityId', ParseIntPipe) communityId: number,
  ): Promise<DeleteResult> {
    return this.service.delete(communityId);
  }
}
