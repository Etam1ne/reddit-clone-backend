import { User } from 'src/models/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { CommentVote } from './comment-vote.entity';
import { ArticleVote } from './article-vote.entity';

@Entity({ name: 'votes' })
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @Column({ name: 'is_positive', type: 'boolean' })
  isPositive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => CommentVote, (commentVote) => commentVote.vote)
  commentVote: CommentVote;

  @OneToOne(() => ArticleVote, (articleVote) => articleVote.vote)
  articleVote: ArticleVote;
}
