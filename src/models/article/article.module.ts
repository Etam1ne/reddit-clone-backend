import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Community } from '../community/entities/community.entity';
import { ArticleVote } from '../vote/entities/article-vote.entity';
import { Article } from './entities/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Community, ArticleVote, Article])],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}
