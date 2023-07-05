import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { CreateArticleDto } from 'src/shared/dtos/create-article.dto';
import { UpdateArticleDto } from 'src/shared/dtos/update-article.dto';
import { User } from 'src/infra/postgres/entities/user.entity';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  public async create(
    communityId: number,
    userId: number,
    createArticleDto: CreateArticleDto,
  ) {
    const article = new Article();

    article.header = createArticleDto.header;
    article.image = createArticleDto.image;
    article.text_content = createArticleDto.textContent;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
    });

    article.user = user;
    article.community = community;
    article.comments = [];

    return this.articleRepository.save(article);
  }

  public async update(
    articleId: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articleRepository.update(articleId, updateArticleDto);

    return this.articleRepository.findOne({ where: { id: articleId } });
  }

  public delete(articleId: number): Promise<DeleteResult> {
    return this.articleRepository.delete(articleId);
  }
}
