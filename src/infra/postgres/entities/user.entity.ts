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
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { Community } from 'src/infra/postgres/entities/community.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Comment, (category) => category.user)
  comments: Comment[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ManyToMany(() => Community, (community) => community.followers)
  @JoinTable({ name: 'users_communities' })
  followed_communities: Community[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
