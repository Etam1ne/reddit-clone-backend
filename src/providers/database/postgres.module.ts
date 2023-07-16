import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/models/user/entities/user.entity';
import { Article } from 'src/models/article/entities/article.entity';
import { Comment } from 'src/models/comment/entities/comment.entity';
import { Community } from 'src/models/community/entities/community.entity';
import { CommentVote } from 'src/models/vote/entities/comment-vote.entity';
import { ArticleVote } from 'src/models/vote/entities/article-vote.entity';
import { Vote } from 'src/models/vote/entities/vote.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      entities: [
        User,
        Article,
        Comment,
        Community,
        CommentVote,
        ArticleVote,
        Vote,
      ],
      migrations: ['dist/infra/postgres/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true,
    }),
  ],
})
export class PostgresModule {}
