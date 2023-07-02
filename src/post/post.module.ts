import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { User } from 'src/user/user.entity';
import { Community } from 'src/community/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Community])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
