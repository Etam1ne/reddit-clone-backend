import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { Community } from './community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityController } from './community.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
