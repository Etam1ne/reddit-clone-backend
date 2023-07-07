import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from 'src/common/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/common/dtos/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  public async create(
    createArticleDto: CreateArticleDto,
  ) {
    const article = this.articleRepository.create({
      ...createArticleDto, 
      user: { id: createArticleDto.userId},
      community: { id: createArticleDto.communityId}
    })
    return this.articleRepository.save(article);
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
