import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { User } from 'src/infra/postgres/entities/user.entity';
import { CommentVote } from './comment-vote.entity';
import { Log } from './log.entity';

@Entity({ name: 'comments' })
export class Comment extends Log {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn({
    name: 'article_id',
    foreignKeyConstraintName: 'fk_article_id',
  })
  article: Article;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_user_comment_id',
  })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.child_comments)
  @JoinColumn({
    name: 'parent_comment_id',
    foreignKeyConstraintName: 'fk_parent_comment_id',
  })
  parent_comment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent_comment)
  child_comments: Comment[];

  @OneToMany(() => CommentVote, (vote) => vote.comment, {
    onDelete: 'CASCADE',
  })
  votes: CommentVote[];
}
