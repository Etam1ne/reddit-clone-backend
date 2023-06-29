import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { CommentController } from './comment/comment.controller';
import { CommunityController } from './community/community.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PostController,
    CommentController,
    CommunityController,
  ],
  providers: [AppService, UserService],
})
export class AppModule {}
