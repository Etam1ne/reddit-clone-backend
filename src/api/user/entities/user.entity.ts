import { Comment } from 'src/api/comment/entities/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subscription } from './subscription.entity';
import { Post } from 'src/api/post/entities/post.entity';
import { Community } from 'src/api/community/entities/community.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  userImage: string;

  @OneToMany(() => Comment, (category) => category.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Community, (community) => community.users)
  communities: Community[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
