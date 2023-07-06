import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsString()
  public readonly description: string;

  @IsOptional()
  @IsString()
  public readonly image: string;
}
