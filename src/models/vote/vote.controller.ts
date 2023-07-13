import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VoteCommentDto } from 'src/common/dtos/vote-comment.dto';
import { VoteService } from './vote.service';
import { VoteArticleDto } from 'src/common/dtos/vote-article.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from 'src/common/types/user-payload.type';

@Controller('vote')
export class VoteController {
  constructor(private readonly service: VoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  public voteComment(
    @CurrentUser() user: UserPayload,
    @Body() voteCommentDto: VoteCommentDto,
  ) {
    return this.service.voteComment(voteCommentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('article')
  public voteArticle(
    @CurrentUser() user: UserPayload,
    @Body() voteArticleDto: VoteArticleDto,
  ) {
    return this.service.voteArticle(voteArticleDto, user);
  }
}
