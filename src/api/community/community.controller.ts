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
import { DeleteResult } from 'typeorm';
import { CommunityService } from 'src/core/services/community.service';
import { CreateCommunityDto } from 'src/shared/dtos/create-community.dto';
import { UpdateCommunityDto } from 'src/shared/dtos/update-community.dto';
import { Community } from 'src/shared/entities/community.entity';
import { User } from 'src/shared/entities/user.entity';
import { Article } from 'src/shared/entities/article.entity';

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

  @Get(':communityId/articles')
  public getArticles(
    @Param('communityId', ParseIntPipe) communityId: number,
  ): Promise<Article[]> {
    return this.service.getArticles(communityId);
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
