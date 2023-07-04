import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  articleId: number;

  @IsString()
  content: string;

  @IsNumber()
  @IsOptional()
  commentId: number;
}
