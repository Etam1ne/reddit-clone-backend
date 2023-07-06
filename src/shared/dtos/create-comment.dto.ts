import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  public readonly userId: string;

  @IsNotEmpty()
  @IsNumber()
  public readonly articleId: string;

  @IsNotEmpty()
  @IsString()
  public readonly content: string;

  @IsOptional()
  @IsNumber()
  public readonly commentId: string;
}
