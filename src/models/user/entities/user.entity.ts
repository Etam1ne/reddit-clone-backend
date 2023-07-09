import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Comment } from 'src/models/comment/entities/comment.entity';
import { Article } from 'src/models/article/entities/article.entity';
import { Community } from 'src/models/community/entities/community.entity';
import { Log } from 'src/common/enities/log.entity';

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
