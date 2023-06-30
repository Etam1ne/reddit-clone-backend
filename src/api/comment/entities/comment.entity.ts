import { Post } from 'src/api/post/entities/post.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
  Entity,
  Column,
  Timestamp,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.childComment)
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComment: Comment[];

  @Column()
  votes: number;

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}