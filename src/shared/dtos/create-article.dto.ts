import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  public readonly header: string;

  @IsOptional()
  @IsString()
  public readonly image?: string;

  @IsNotEmpty()
  @IsString()
  public readonly textContent: string;

  @IsNotEmpty()
  @IsUUID()
  public readonly userId: string;

  @IsNotEmpty()
  @IsUUID()
  public readonly communityId: string;
}
