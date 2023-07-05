import { Article } from 'src/infra/postgres/entities/article.entity';
import { User } from 'src/infra/postgres/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Log } from './log.entity';

@Entity({ name: 'communities' })
export class Community extends Log {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @ManyToMany(() => User, (user) => user.followed_communities)
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
