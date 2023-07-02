import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
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
