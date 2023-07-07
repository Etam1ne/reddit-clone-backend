import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz'})
  updatedAt: Date;
}
