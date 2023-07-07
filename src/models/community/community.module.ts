import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { User } from '../user/entities/user.entity';
import { Article } from '../article/entities/article.entity';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Community, User, Article])],
    controllers: [CommunityController],
    providers: [CommunityService],
})
export class CommunityModule {}
