import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from 'src/shared/entities/community.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommunityDto } from 'src/shared/dtos/create-community.dto';
import { UpdateCommunityDto } from 'src/shared/dtos/update-community.dto';
import { User } from 'src/shared/entities/user.entity';
import { Article } from 'src/shared/entities/article.entity';

@Injectable()
export class CommunityService {
  @InjectRepository(Community)
  private readonly repository: Repository<Community>;

  public create(body: CreateCommunityDto): Promise<Community> {
    const community = new Community();

    community.name = body.name;
    community.description = body.description;
    community.image = body.image;
    community.followers = [];
    community.articles = [];

    return this.repository.save(community);
  }

  public async updateInfo(
    communityId: number,
    updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    this.repository.update(communityId, updateCommunityDto);

    return this.repository.findOne({ where: { communityId } });
  }

  public getAll() {
    return this.repository.find();
  }

  public async getFollowers(communityId: number): Promise<User[]> {
    const community = await this.repository.findOne({
      where: { communityId },
      relations: ['followers'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community.followers;
  }

  public async getArticles(communityId: number): Promise<Article[]> {
    const community = await this.repository.findOne({
      where: { communityId },
      relations: ['articles'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community.articles;
  }

  public async delete(communityId: number): Promise<DeleteResult> {
    return this.repository.delete(communityId);
  }
}
