import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Community } from '../community/entities/community.entity';
import { ArticleVote } from '../vote/entities/article-vote.entity';
import { Article } from './entities/article.entity';
import { VoteService } from '../vote/vote.service';
import { Comment } from '../comment/entities/comment.entity';
import { Vote } from '../vote/entities/vote.entity';
import { CommentVote } from '../vote/entities/comment-vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Community,
      ArticleVote,
      Article,
      Comment,
      Vote,
      CommentVote,
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, VoteService],
})
export class ArticleModule {}
