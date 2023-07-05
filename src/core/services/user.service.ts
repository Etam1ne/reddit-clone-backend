import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from 'src/shared/dtos/create-user.dto';
import { UpdateUserDto } from 'src/shared/dtos/update-user.dto';
import { User } from 'src/infra/postgres/entities/user.entity';
import { hash } from 'bcrypt';
import { Community } from 'src/infra/postgres/entities/community.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/infra/postgres/entities/article.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Community)
  private readonly communityRepository: Repository<Community>;

  public getById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }

  public getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async create(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.username = body.username;
    user.email = body.email;
    user.followed_communities = [];
    user.comments = [];
    user.articles = [];

    user.password = await hash(body.password, 5);

    return this.userRepository.save(user);
  }

  public async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.userRepository.update(userId, updateUserDto);

    return this.userRepository.findOne({ where: { userId } });
  }

  public getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async followCommunity(
    userId: number,
    communityId: number,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['followedCommunities'],
    });
    const community = await this.communityRepository.findOne({
      where: { communityId },
    });

    if (!user || !community) {
      throw new NotFoundException('User or community not found');
    }

    user.followed_communities.push(community);
    return this.userRepository.save(user);
  }

  public async getFollowedCommunities(userId: number): Promise<Community[]> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['followedCommunities'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.followed_communities;
  }

  public async getArticles(userId: number): Promise<Article[]> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['articles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.articles;
  }

  public delete(userId): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
