import { Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Vote } from './vote.entity';
import { Article } from 'src/models/article/entities/article.entity';

@Entity({ name: 'article_votes' })
export class ArticleVote extends Vote {
  @ManyToOne(() => Article, (article) => article.votes)
  @JoinColumn({
    name: 'article_id',
    foreignKeyConstraintName: 'fk_article_vote_id',
  })
  article: Article;

  @OneToOne(() => Vote, (vote) => vote.commentVote)
  vote: Vote;
}
