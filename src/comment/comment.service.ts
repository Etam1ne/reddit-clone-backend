import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './comment.dto';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getByPost(postId: number): Promise<Comment[]> {
    const post = await this.postRepository.findOne({ where: { postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.commentRepository.find({
      where: { post: { postId: post.postId } },
      relations: ['childComments'],
    });
  }

  public async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: { userId: createCommentDto.userId },
    });
    const post = await this.postRepository.findOne({
      where: { postId: createCommentDto.postId },
    });

    if (!user || !post) {
      throw new NotFoundException('User or post not found');
    }

    const comment = new Comment();

    comment.post = post;
    comment.user = user;
    comment.content = createCommentDto.content;
    comment.votes = 0;
    comment.childComments = [];

    if (createCommentDto.commentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { commentId: createCommentDto.commentId },
      });

      comment.parentComment = parentComment;
    }

    return this.commentRepository.save(comment);
  }

  public async delete(commentId: number): Promise<DeleteResult> {
    return this.commentRepository.delete(commentId);
  }
}
