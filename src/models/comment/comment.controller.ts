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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from 'src/common/types/user-payload.type';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(
    @CurrentUser() user: UserPayload,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.service.create(createCommentDto, user);
  }

  @Get(':articleId')
  public getByArticle(
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<Comment[]> {
    return this.service.getByArticle(articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  public delete(
    @CurrentUser() user: UserPayload,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<boolean> {
    return this.service.delete(commentId, user);
  }
}
