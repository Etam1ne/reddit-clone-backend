import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { CommunityModule } from './community/community.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    ArticleModule,
    CommentModule,
    CommunityModule,
    UserModule,
    VoteModule,
  ],
})
export class ModelsModule {}
