import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateVoteDto } from './create-vote.dto';

export class VoteArticleDto extends CreateVoteDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;
}
