import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePostDto {
  @IsString()
  header: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  textContent: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
