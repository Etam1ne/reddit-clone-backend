import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Comment } from '../comment/entities/comment.entity';
import { Article } from '../article/entities/article.entity';
import { ArticleVote } from './entities/article-vote.entity';
import { CommentVote } from './entities/comment-vote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Comment,
      Article,
      Vote,
      ArticleVote,
      CommentVote,
    ]),
    Comment,
    Article,
    ArticleVote,
    CommentVote,
  ],
  providers: [VoteService],
  controllers: [VoteController],
  exports: [VoteService],
})
export class VoteModule {}
