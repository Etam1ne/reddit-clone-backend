import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VoteCommentDto } from 'src/common/dtos/vote-comment.dto';
import { UserAccessGuard } from 'src/common/guards/user-access.guard';
import { VoteService } from './vote.service';
import { VoteArticleDto } from 'src/common/dtos/vote-article.dto';

@Controller('vote')
export class VoteController {
  constructor(private readonly service: VoteService) {}

  @UseGuards(UserAccessGuard)
  @Post('comment')
  @UseGuards(UserAccessGuard)
  public voteComment(@Body() voteCommentDto: VoteCommentDto) {
    return this.service.voteComment(voteCommentDto);
  }

  @UseGuards(UserAccessGuard)
  @Post('article')
  public voteArticle(@Body() voteArticleDto: VoteArticleDto) {
    return this.service.voteArticle(voteArticleDto);
  }
}
