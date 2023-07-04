import { Article } from 'src/shared/entities/article.entity';
import { User } from 'src/shared/entities/user.entity';
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

  @OneToMany(() => Article, (article) => article.community, { onDelete: 'CASCADE' })
  articles: Article[];

  @ManyToMany(() => User, (user) => user.followed_communities)
  followers: User[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
