import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto, UpdateCommunityDto } from './community.dto';

@Controller('communities')
export class CommunityController {
  constructor(private readonly service: CommunityService) {}

  @Post()
  public create(@Body() body: CreateCommunityDto) {
    return this.service.create(body);
  }

  @Get()
  public getAll() {
    return this.service.getAll();
  }

  @Put(':communityId')
  public updateInfo(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.service.updateInfo(communityId, updateCommunityDto);
  }

  @Get(':communityId/followers')
  public getCommunityFollowers(
    @Param('communityId', ParseIntPipe) communityId: number,
  ) {
    return this.service.getFollowers(communityId);
  }
}
