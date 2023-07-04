import { Module } from '@nestjs/common';
import { CommunityService } from '../../core/services/community.service';
import { Community } from 'src/shared/entities/community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityController } from './community.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
