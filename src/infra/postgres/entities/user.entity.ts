import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Comment } from 'src/infra/postgres/entities/comment.entity';
import { Article } from 'src/infra/postgres/entities/article.entity';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { Log } from './log.entity';

@Entity('users')
export class User extends Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 16 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Comment, (category) => category.user)
  comments: Comment[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ManyToMany(() => Community, (community) => community.followers)
  followedCommunities: Community[];
}
