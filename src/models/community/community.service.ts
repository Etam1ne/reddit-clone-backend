import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommunityDto } from 'src/common/dtos/create-community.dto';
import { UpdateCommunityDto } from 'src/common/dtos/update-community.dto';
import { User } from '../user/entities/user.entity';
import { Article } from '../article/entities/article.entity';

@Injectable()
export class CommunityService {
  @InjectRepository(Community)
  private readonly communityRepository: Repository<Community>;

  public create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const community = this.communityRepository.create(createCommunityDto);

    return this.communityRepository.save(community);
  }

  public async updateInfo(
    communityId: string,
    updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    this.communityRepository.update({ id: communityId }, updateCommunityDto);

    return this.communityRepository.findOne({ where: { id: communityId } });
  }

  public getAll() {
    return this.communityRepository.find();
  }

  public async getFollowers(communityId: string): Promise<User[]> {
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
      relations: ['followers'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community.followers;
  }

  public async getArticles(communityId: string): Promise<Article[]> {
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
      relations: ['articles'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community.articles;
  }

  public async delete(communityId: string): Promise<DeleteResult> {
    return this.communityRepository.delete({ id: communityId });
  }
}
