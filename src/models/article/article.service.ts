import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IFullArticle } from 'src/common/interfaces/full-article.interface';
import { Comment } from '../comment/entities/comment.entity';
import { ArticleVote } from '../vote/entities/article-vote.entity';
import { VoteService } from '../vote/vote.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly voteService: VoteService,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(ArticleVote)
    private readonly articleVoteRepository: Repository<ArticleVote>,
  ) {}

  public async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create({
      ...createArticleDto,
      user: { id: createArticleDto.userId },
      community: { id: createArticleDto.communityId },
    });
    return this.articleRepository.save(article);
  }

  public async getLatestFeed(page = 1, limit = 10): Promise<IFullArticle[]> {
    const skip = (page - 1) * limit;

    const articles = await this.articleRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
      relations: ['community', 'user'],
    });

    const fullArticles = articles.map(
      async (article): Promise<IFullArticle> => {
        const countedVotes = await this.voteService.countVotes(
          this.articleVoteRepository,
          article.id,
        );
        const [comments, commentsNumber] =
          await this.commentRepository.findAndCount({ where: { article } });
        return {
          ...article,
          countedVotes,
          commentsNumber,
          username: article.user.name,
          communityName: article.community.name,
        };
      },
    );

    return Promise.all(fullArticles);
  }

  public async update(
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articleRepository.update({ id: articleId }, updateArticleDto);

    return this.articleRepository.findOne({ where: { id: articleId } });
  }

  public delete(articleId: string): Promise<DeleteResult> {
    return this.articleRepository.delete({ id: articleId });
  }
}
