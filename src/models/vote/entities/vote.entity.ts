import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'votes' })
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz'})
  createdAt: Date;
}
