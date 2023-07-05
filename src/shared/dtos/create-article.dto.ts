import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  public readonly header: string;

  @IsString()
  @IsOptional()
  public readonly image: string;

  @IsString()
  public readonly textContent: string;
}
