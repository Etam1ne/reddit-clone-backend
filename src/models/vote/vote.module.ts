import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Comment } from '../comment/entities/comment.entity';
import { Article } from '../article/entities/article.entity';
import { ArticleVote } from './entities/article-vote.entity';
import { CommentVote } from './entities/comment-vote.entity';

@Module({
  imports: [Comment, Article, ArticleVote, CommentVote],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
