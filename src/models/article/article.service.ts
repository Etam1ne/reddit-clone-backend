import { Injectable } from '@nestjs/common';
import { DeleteResult, FindOptionsOrder, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { feedType } from 'src/common/types/feed-type.enum';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  public async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create({
      ...createArticleDto,
      user: { id: createArticleDto.userId },
      community: { id: createArticleDto.communityId },
    });
    return this.articleRepository.save(article);
  }

  public async getFeed(
    type: feedType = feedType.popular,
    page = 1,
    limit = 10,
  ) {
    const skip = (page - 1) * limit;
    let order: FindOptionsOrder<Article>;

    switch (type) {
      case feedType.latest:
        order = {
          createdAt: 'DESC',
        };
        break;
      default:
        order = {
          votes: {},
        };
        break;
    }

    return this.articleRepository.find({
      order,
      skip,
      take: limit,
    });
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
