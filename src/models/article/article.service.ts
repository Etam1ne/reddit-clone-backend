import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IFullArticle } from 'src/common/interfaces/full-article.interface';
import { Comment } from '../comment/entities/comment.entity';
import { ArticleVote } from '../vote/entities/article-vote.entity';
import { VoteService } from '../vote/vote.service';
import { UserPayload } from 'src/common/types/user-payload.type';

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

  public async create(createArticleDto: CreateArticleDto, user: UserPayload) {
    const article = this.articleRepository.create({
      ...createArticleDto,
      user: { id: user.sub },
      community: { id: createArticleDto.communityId },
    });
    return this.articleRepository.save(article);
  }

  public async getFeed(
    order: FindOptionsOrder<Article>,
    page = 1,
    limit = 10,
  ): Promise<IFullArticle[]> {
    const skip = (page - 1) * limit;

    const articles = await this.articleRepository.find({
      order,
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
