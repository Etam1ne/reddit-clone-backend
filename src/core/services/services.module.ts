import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthService } from './auth.service';
import { CommentService } from './comment.service';
import { CommunityService } from './community.service';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/postgres/entities/user.entity';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt.contants.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Article, Comment, Community]),
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
export class ServicesModule {}
