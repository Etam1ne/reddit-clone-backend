import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post(':communityId/:userId')
  public create(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    this.service.create(communityId, userId, createPostDto);
  }

  @Put('postId')
  public update(
    @Param(':postId', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    this.service.update(postId, updatePostDto);
  }

  @Delete(':postId')
  public delete(@Param(':postId', ParseIntPipe) postId: number) {
    this.service.delete(postId);
  }
}
