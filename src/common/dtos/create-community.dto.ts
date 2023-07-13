import { IsOptional, IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsUUID()
  public readonly userId: string;

  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsString()
  public readonly description?: string;

  @IsOptional()
  @IsString()
  public readonly image?: string;
}
