import { IsOptional, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsString()
  @IsOptional()
  public readonly image: string;
}
