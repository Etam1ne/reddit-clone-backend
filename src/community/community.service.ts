import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDto, UpdateCommunityDto } from './community.dto';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

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
    community.posts = [];

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

  public async getPosts(communityId: number): Promise<Post[]> {
    const community = await this.repository.findOne({
      where: { communityId },
      relations: ['posts'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community.posts;
  }
}
