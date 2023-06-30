import { Comment } from 'src/api/comment/entities/comment.entity';
import { Community } from 'src/api/community/entities/community.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  header: string;

  @Column()
  image: string;

  @Column()
  textContent: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
