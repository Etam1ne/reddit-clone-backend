import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Article } from 'src/models/article/entities/article.entity';
import { User } from 'src/models/user/entities/user.entity';
import { Log } from 'src/common/enities/log.entity';

@Entity({ name: 'communities' })
export class Community extends Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 57 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  description: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Article, (article) => article.community, {
    onDelete: 'CASCADE',
  })
  articles: Article[];

  @ManyToMany(() => User, (user) => user.followedCommunities)
  @JoinTable({
    name: 'users_communities',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'community',
      referencedColumnName: 'id',
    },
  })
  followers: User[];
}
