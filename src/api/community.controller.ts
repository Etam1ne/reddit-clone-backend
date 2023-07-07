import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CommunityService } from 'src/core/services/community.service';
import { CreateCommunityDto } from 'src/shared/dtos/create-community.dto';
import { UpdateCommunityDto } from 'src/shared/dtos/update-community.dto';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { User } from 'src/infra/postgres/entities/user.entity';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Communities')
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
    @Param('communityId', ParseUUIDPipe) communityId: string,
  ): Promise<Article[]> {
    return this.service.getArticles(communityId);
  }

  @Put(':communityId')
  public updateInfo(
    @Param('communityId', ParseUUIDPipe) communityId: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    return this.service.updateInfo(communityId, updateCommunityDto);
  }

  @Get(':communityId/followers')
  public getFollowers(
    @Param('communityId', ParseUUIDPipe) communityId: string,
  ): Promise<User[]> {
    return this.service.getFollowers(communityId);
  }

  @Delete(':communityId')
  public deleteCommunity(
    @Param('communityId', ParseUUIDPipe) communityId: string,
  ): Promise<DeleteResult> {
    return this.service.delete(communityId);
  }
}
