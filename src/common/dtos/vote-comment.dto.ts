import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateVoteDto } from './create-vote.dto';

export class VoteCommentDto extends CreateVoteDto {
  @IsNotEmpty()
  @IsUUID()
  commentId: string;
}
