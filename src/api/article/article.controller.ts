import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/shared/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/shared/dtos/update-article.dto';
import { ArticleService } from 'src/core/services/article.service';

@Controller('posts')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Post()
  public create(
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.service.create(createArticleDto);
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
