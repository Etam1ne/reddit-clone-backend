import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/common/dtos/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from 'src/common/guards/user-access.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(UserAccessGuard)
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
