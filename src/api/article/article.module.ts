import { Module } from '@nestjs/common';
import { ArticleService } from 'src/core/services/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/shared/entities/article.entity';
import { ArticleController } from './article.controller';
import { User } from 'src/shared/entities/user.entity';
import { Community } from 'src/shared/entities/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User, Community])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
