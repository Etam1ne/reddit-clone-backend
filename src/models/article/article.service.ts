import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IFullArticle } from 'src/common/interfaces/full-article.interface';
import { Comment } from '../comment/entities/comment.entity';
import { ArticleVote } from '../vote/entities/article-vote.entity';
import { VoteService } from '../vote/vote.service';
import { UserPayload } from 'src/common/types/user-payload.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async create(
    createArticleDto: CreateArticleDto,
    user: UserPayload,
  ): Promise<Article> {
    const article = this.articleRepository.create({
      ...createArticleDto,
      user: { id: user.sub },
      community: { id: createArticleDto.communityId },
    });
    return this.articleRepository.save(article);
  }

  public async getPositiveFeed(page = 1, limit = 10): Promise<IFullArticle[]> {
    const cacheKey = `positiveFeed:${page}:${limit}`;
    const sort = 'SUM(CASE WHEN vote.isPositive = true THEN 1 ELSE -1 END)';
  
    return this.getFeed(page, limit, cacheKey, sort);
  }
  
  public async getNegativeFeed(page = 1, limit = 10): Promise<IFullArticle[]> {
    const cacheKey = `negativeFeed:${page}:${limit}`;
    const sort = 'SUM(CASE WHEN vote.isPositive = true THEN 1 ELSE -1 END)';
  
    return this.getFeed(page, limit, cacheKey, sort, 'ASC');
  }
  
  public async getPopularFeed(page = 1, limit = 10): Promise<IFullArticle[]> {
    const cacheKey = `popularFeed:${page}:${limit}`;
    const sort = 'COUNT(vote)';
  
    return this.getFeed(page, limit, cacheKey, sort);
  }
  
  public async getLatestFeed(page = 1, limit = 10): Promise<IFullArticle[]> {
    const cacheKey = `latestFeed:${page}:${limit}`;
    const sort = 'article.created_at';
  
    return this.getFeed(page, limit, cacheKey, sort);
  }

  private async getFeed(
    page: number,
    limit: number,
    cacheKey: string,
    sort: string,
    order?: "DESC" | "ASC",
    additionalQueryOptions?: any
  ): Promise<IFullArticle[]> {
    const cachedArticles: IFullArticle[] = await this.cacheManager.get(cacheKey);
    if (cachedArticles) {
      return cachedArticles;
    }
  
    const skip: number = (page - 1) * limit;
  
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.community', 'community')
      .leftJoin('article.votes', 'vote')
      .groupBy('article.id, vote.id, user.id, community.id')
      .orderBy(sort, order)
      .skip(skip)
      .limit(limit);
  
    if (additionalQueryOptions) {
      queryBuilder.andWhere(additionalQueryOptions);
    }
  
    const articles: Article[] = await queryBuilder.getMany();
    const fullArticles: IFullArticle[] = await this.returnFullArticles(articles);
    const ttl: number = 600 * 1000;
  
    this.cacheManager.set(cacheKey, fullArticles, ttl);
  
    return fullArticles;
  }

  private async returnFullArticles(
    articles: Article[],
  ): Promise<IFullArticle[]> {
    const fullArticles = articles.map(
      async (article): Promise<IFullArticle> => {
        const countedVotes = await this.voteService.countVotes(
          this.articleVoteRepository,
          article.id,
        );
        const [comments, commentsNumber] =
          await this.commentRepository.findAndCount({ where: { article } });
        const { user, community, ...other } = article;
        return {
          ...other,
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
    user: UserPayload,
  ): Promise<Article> {
    await this.articleRepository.update(
      { id: articleId, user: { id: user.sub } },
      updateArticleDto,
    );

    return this.articleRepository.findOne({ where: { id: articleId } });
  }

  public async delete(articleId: string, user: UserPayload): Promise<boolean> {
    const deleteResult = await this.articleRepository.delete({
      id: articleId,
      user: { id: user.sub },
    });

    if (deleteResult.affected === 0) throw new NotFoundException();

    return true;
  }
}
