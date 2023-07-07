import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from 'src/common/dtos/create-comment.dto';
import { Article } from '../article/entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  public async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto, 
      article: { id: createCommentDto.articleId },
      user: { id: createCommentDto.userId }
    })

    if (createCommentDto.commentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: createCommentDto.commentId },
      });

      comment.parentComment = parentComment;
    }

    return this.commentRepository.save(comment);
  }

  public async delete(commentId: string): Promise<DeleteResult> {
    return this.commentRepository.delete({ id: commentId });
  }
}
