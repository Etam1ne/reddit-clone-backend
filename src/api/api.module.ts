import { Module } from '@nestjs/common';
import { ArticleController } from './article/article.controller';
import { AuthController } from './auth/auth.controller';
import { CommentController } from './comment/comment.controller';
import { UserController } from './user/user.controller';
import { CommunityController } from './community/community.controller';
import { ArticleService } from 'src/core/services/article.service';
import { AuthService } from 'src/core/services/auth.service';
import { CommentService } from 'src/core/services/comment.service';
import { CommunityService } from 'src/core/services/community.service';
import { UserService } from 'src/core/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/postgres/entities/user.entity';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article, Comment, Community])],
  controllers: [
    ArticleController,
    AuthController,
    CommentController,
    CommunityController,
    UserController,
  ],
  providers: [
    ArticleService,
    AuthService,
    CommentService,
    CommunityService,
    UserService,
    JwtService,
  ],
})
export class ApiModule {}
