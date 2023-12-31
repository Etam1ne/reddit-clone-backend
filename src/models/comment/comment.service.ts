import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from 'src/common/dtos/create-comment.dto';
import { Article } from '../article/entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/common/types/user-payload.type';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  public async getByArticle(articleId: string): Promise<Comment[]> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.commentRepository.find({
      where: { article: { id: article.id } },
      relations: ['childComments'],
    });
  }

  public async create(
    createCommentDto: CreateCommentDto,
    user: UserPayload,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      article: { id: createCommentDto.articleId },
      user: { id: user.sub },
    });

    if (createCommentDto.commentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: createCommentDto.commentId },
      });

      comment.parentComment = parentComment;
    }

    return this.commentRepository.save(comment);
  }

  public async delete(commentId: string, user: UserPayload): Promise<boolean> {
    const deleteResult = await this.commentRepository.delete({
      id: commentId,
      user: { id: user.sub },
    });

    if (deleteResult.affected === 0) throw new NotFoundException();

    return true;
  }
}
