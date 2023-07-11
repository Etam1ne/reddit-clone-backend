import { Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Vote } from './vote.entity';
import { Comment } from 'src/models/comment/entities/comment.entity';

@Entity({ name: 'comment_votes' })
export class CommentVote extends Vote {
  @ManyToOne(() => Comment, (comment) => comment.votes)
  @JoinColumn({
    name: 'comment_id',
    foreignKeyConstraintName: 'fk_comment_vote_id',
  })
  comment: Comment;

  @OneToOne(() => Vote, (vote) => vote.commentVote)
  vote: Vote;
}
