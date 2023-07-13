import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from 'src/common/dtos/create-community.dto';
import { UpdateCommunityDto } from 'src/common/dtos/update-community.dto';
import { Community } from './entities/community.entity';
import { User } from '../user/entities/user.entity';
import { Article } from '../article/entities/article.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from 'src/common/types/user-payload.type';

@ApiTags('Communities')
@Controller('communities')
export class CommunityController {
  constructor(private readonly service: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(
    @CurrentUser() user: UserPayload,
    @Body() body: CreateCommunityDto,
  ): Promise<Community> {
    return this.service.create(body, user);
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
