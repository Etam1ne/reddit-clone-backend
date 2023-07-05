import { IsOptional, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;
}
