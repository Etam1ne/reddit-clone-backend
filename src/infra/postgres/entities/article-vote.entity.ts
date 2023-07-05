import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Vote } from './vote.entity';
import { Article } from './article.entity';

@Entity({ name: 'article_votes' })
export class ArticleVote extends Vote {
  @ManyToOne(() => Article, (article) => article.votes)
  @JoinColumn({
    name: 'article_id',
    foreignKeyConstraintName: 'fk_article_vote_id',
  })
  article: Article;
}
