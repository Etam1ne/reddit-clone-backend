import {
  Controller,
  ParseIntPipe,
  Param,
  Get,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { DeleteResult } from 'typeorm';

@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  public create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.service.create(createCommentDto);
  }

  @Get(':postId')
  public getByPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<Comment[]> {
    return this.service.getByPost(postId);
  }

  @Delete(':commentId')
  public delete(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<DeleteResult> {
    return this.service.delete(commentId);
  }
}
