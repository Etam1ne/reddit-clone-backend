import { User } from 'src/models/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'votes' })
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_voted_user_id',
  })
  user: User;

  @Column({ name: 'is_positive', type: 'boolean' })
  isPositive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
