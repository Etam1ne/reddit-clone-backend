import { Injectable } from '@nestjs/common';
import { VoteCommentDto } from 'src/common/dtos/vote-comment.dto';
import { VoteArticleDto } from 'src/common/dtos/vote-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { Article } from '../article/entities/article.entity';
import { Vote } from './entities/vote.entity';
import { ArticleVote } from './entities/article-vote.entity';
import { CommentVote } from './entities/comment-vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(ArticleVote)
    private readonly articleVoteRepository: Repository<ArticleVote>,
    @InjectRepository(CommentVote)
    private readonly commentVoteRepository: Repository<CommentVote>,
  ) {}

  public async voteComment({
    userId,
    commentId,
    isPositive,
  }: VoteCommentDto): Promise<CommentVote> {
    const vote = await this.createVote(userId, isPositive);
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    const commentVote = this.commentVoteRepository.create({ vote, comment });

    return this.commentVoteRepository.save(commentVote);
  }

  public async voteArticle({
    userId,
    articleId,
    isPositive,
  }: VoteArticleDto): Promise<ArticleVote> {
    const vote = await this.createVote(userId, isPositive);
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    const articleVote = this.articleVoteRepository.create({ vote, article });

    return this.articleVoteRepository.save(articleVote);
  }

  public async countVotes(
    repository: Repository<CommentVote | ArticleVote>,
    id: string,
  ): Promise<number> {
    const [positiveVotes, numberOfPositive] = await repository.findAndCount({
      where: { isPositive: true, id },
    });
    const [negativeVotes, numberOfNegative] = await repository.findAndCount({
      where: { isPositive: false, id },
    });

    return numberOfPositive - numberOfNegative;
  }

  private async createVote(userId: string, isPositive: boolean): Promise<Vote> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const vote = this.voteRepository.create({ user, isPositive });

    return this.voteRepository.save(vote);
  }
}
