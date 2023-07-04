import {
  Controller,
  ParseIntPipe,
  Param,
  Get,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CommentService } from 'src/core/services/comment.service';
import { CreateCommentDto } from 'src/shared/dtos/create-comment.dto';
import { Comment } from 'src/shared/entities/comment.entity';
import { DeleteResult } from 'typeorm';

@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  public create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.service.create(createCommentDto);
  }

  @Get(':articleId')
  public getByArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
  ): Promise<Comment[]> {
    return this.service.getByArticle(articleId);
  }

  @Delete(':commentId')
  public delete(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<DeleteResult> {
    return this.service.delete(commentId);
  }
}
