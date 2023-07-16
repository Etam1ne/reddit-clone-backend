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
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from 'src/common/types/user-payload.type';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(
    @CurrentUser() user: UserPayload,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.service.create(createArticleDto, user);
  }

  @Get('feed/latest')
  public getLatestFeed(
    @Query('page', OptionalParseIntPipe) page?: number,
    @Query('limit', OptionalParseIntPipe) limit?: number,
  ) {
    return this.service.getLatestFeed(page, limit);
  }

  @Get('feed/popular')
  public getPopularFeed(
    @Query('page', OptionalParseIntPipe) page?: number,
    @Query('limit', OptionalParseIntPipe) limit?: number,
  ) {
    return this.service.getPopularFeed(page, limit);
  }
  @Get('feed/positive')
  public getPositiveFeed(
    @Query('page', OptionalParseIntPipe) page?: number,
    @Query('limit', OptionalParseIntPipe) limit?: number,
  ) {
    return this.service.getPositiveFeed(page, limit);
  }
  @Get('feed/negative')
  public getNegativeFeed(
    @Query('page', OptionalParseIntPipe) page?: number,
    @Query('limit', OptionalParseIntPipe) limit?: number,
  ) {
    return this.service.getNegativeFeed(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':articleId')
  public update(
    @CurrentUser() user: UserPayload,
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Body() updatePostDto: UpdateArticleDto,
  ) {
    return this.service.update(articleId, updatePostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':articleId')
  public delete(
    @CurrentUser() user: UserPayload,
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ) {
    return this.service.delete(articleId, user);
  }
}
