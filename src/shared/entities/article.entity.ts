import { Comment } from 'src/shared/entities/comment.entity';
import { Community } from 'src/shared/entities/community.entity';
import { User } from 'src/shared/entities/user.entity';
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
export class Article {
  @PrimaryGeneratedColumn()
  articleId: number;

  @Column()
  header: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  textContent: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @ManyToOne(() => Community, (community) => community.articles)
  community: Community;

  @OneToMany(() => Comment, (comment) => comment.article, { onDelete: 'CASCADE' })
  comments: Comment[];

  // Create/Update time

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
