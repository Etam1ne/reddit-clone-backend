import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/shared/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/shared/dtos/update-article.dto';
import { ArticleService } from 'src/core/services/article.service';

@Controller('posts')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Post(':communityId/:userId')
  public create(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreateArticleDto,
  ) {
    return this.service.create(communityId, userId, createPostDto);
  }

  @Put(':postId')
  public update(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdateArticleDto,
  ) {
    return this.service.update(postId, updatePostDto);
  }

  @Delete(':postId')
  public delete(@Param('postId', ParseIntPipe) postId: number) {
    return this.service.delete(postId);
  }
}
