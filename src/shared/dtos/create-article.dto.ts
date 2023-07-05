import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  header: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  textContent: string;
}
