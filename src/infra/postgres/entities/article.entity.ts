import { User } from 'src/infra/postgres/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { ArticleVote } from './article-vote.entity';
import { Log } from './log.entity';

@Entity({ name: 'articles' })
export class Article extends Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 63 })
  header: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text', name: 'text_content' })
  textContent: string;

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_article_users_id',
  })
  user: User;

  @ManyToOne(() => Community, (community) => community.articles)
  @JoinColumn({
    name: 'community_id',
    foreignKeyConstraintName: 'fk_article_community_id',
  })
  community: Community;

  @OneToMany(() => Comment, (comment) => comment.article, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => ArticleVote, (vote) => vote.article, {
    onDelete: 'CASCADE',
  })
  votes: ArticleVote[];
}