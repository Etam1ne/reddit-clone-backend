import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Community {
  @PrimaryGeneratedColumn()
  communityId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.followedCommunities)
  followers: User[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
