import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentService } from 'src/core/services/comment.service';
import { CreateCommentDto } from 'src/shared/dtos/create-comment.dto';
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  public create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.service.create(createCommentDto);
  }

  @Get(':articleId')
  public getByArticle(
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<Comment[]> {
    return this.service.getByArticle(articleId);
  }

  @Delete(':commentId')
  public delete(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<DeleteResult> {
    return this.service.delete(commentId);
  }
}
