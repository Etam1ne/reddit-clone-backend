import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  isPositive: boolean;
}
