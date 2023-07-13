import { IsOptional, IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  public readonly articleId: string;

  @IsNotEmpty()
  @IsString()
  public readonly content: string;

  @IsOptional()
  @IsUUID()
  public readonly commentId?: string;
}
