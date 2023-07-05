import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { CreateCommentDto } from 'src/shared/dtos/create-comment.dto';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { User } from 'src/infra/postgres/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getByArticle(articleId: number): Promise<Comment[]> {
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
    const user = await this.userRepository.findOne({
      where: { id: createCommentDto.userId },
    });
    const article = await this.articleRepository.findOne({
      where: { id: createCommentDto.articleId },
    });

    if (!user || !article) {
      throw new NotFoundException('User or article not found');
    }

    const comment = new Comment();

    comment.article = article;
    comment.user = user;
    comment.content = createCommentDto.content;
    comment.votes = [];
    comment.child_comments = [];

    if (createCommentDto.commentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: createCommentDto.commentId },
      });

      comment.parent_comment = parentComment;
    }

    return this.commentRepository.save(comment);
  }

  public async delete(commentId: number): Promise<DeleteResult> {
    return this.commentRepository.delete(commentId);
  }
}
