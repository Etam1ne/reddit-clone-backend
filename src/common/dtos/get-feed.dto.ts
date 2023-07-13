import { IsNumber, IsOptional } from 'class-validator';

export class GetFeedDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
}
