import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityService {
    @InjectRepository(Community)
    private readonly repository: Repository<Community>

    
}
