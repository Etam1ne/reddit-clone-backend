import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
import { OptionalParseIntPipe } from 'src/common/pipes/optional-parse-int.pipe';
import { UserAccessGuard } from 'src/common/guards/user-access.guard';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @UseGuards(UserAccessGuard)
  @Post()
  public create(@Body() createArticleDto: CreateArticleDto) {
    return this.service.create(createArticleDto);
  }

  @Get('feed/latest')
  public getLatestFeed(
    @Query('page', OptionalParseIntPipe) page?: number,
    @Query('limit', OptionalParseIntPipe) limit?: number,
  ) {
    return this.service.getFeed({ createdAt: 'DESC' }, page, limit);
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
