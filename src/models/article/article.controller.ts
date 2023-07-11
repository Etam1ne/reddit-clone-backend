import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
import { feedType } from 'src/common/types/feed-type.enum';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Post()
  public create(@Body() createArticleDto: CreateArticleDto) {
    return this.service.create(createArticleDto);
  }

  @Get('feed')
  public getFeed(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('type', ParseEnumPipe<feedType>) type?: feedType,
  ) {
    return this.service.getFeed(type, page, limit);
  }

  @Put(':articleId')
  public update(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Body() updatePostDto: UpdateArticleDto,
  ) {
    return this.service.update(articleId, updatePostDto);
  }

  @Delete(':articleId')
  public delete(@Param('articleId', ParseUUIDPipe) articleId: string) {
    return this.service.delete(articleId);
  }
}
