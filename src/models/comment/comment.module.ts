import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CommentVote } from '../vote/entities/comment-vote.entity';
import { Comment } from './entities/comment.entity';
import { Article } from '../article/entities/article.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, CommentVote, Comment, Article])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
