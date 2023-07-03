import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  postId: number;

  @IsString()
  content: string;

  @IsNumber()
  @IsOptional()
  commentId: number;
}
