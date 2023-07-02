import { Comment } from 'src/comment/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from 'src/post/post.entity';
import { Community } from 'src/community/community.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (category) => category.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Community, (community) => community.users)
  @JoinTable({ name: 'user-community' })
  communities: Community[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
