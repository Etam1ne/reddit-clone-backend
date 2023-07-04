import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { CommunityModule } from './community/community.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommentModule, CommunityModule, ArticleModule, UserModule],
})
export class ApiModule {}
