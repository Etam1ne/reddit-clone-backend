import { Module } from '@nestjs/common';
import { CommentService } from '../../core/services/comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entities/comment.entity';
import { Article } from 'src/shared/entities/article.entity';
import { User } from 'src/shared/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article, User])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
