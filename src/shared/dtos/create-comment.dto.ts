import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  public readonly userId: number;

  @IsNumber()
  public readonly articleId: number;

  @IsString()
  public readonly content: string;

  @IsNumber()
  @IsOptional()
  public readonly commentId: number;
}
