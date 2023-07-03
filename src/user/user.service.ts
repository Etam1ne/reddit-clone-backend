import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { hash } from 'bcrypt';
import { Community } from 'src/community/community.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';

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
    user.followedCommunities = [];
    user.comments = [];
    user.posts = [];

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

    user.followedCommunities.push(community);
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

    return user.followedCommunities;
  }

  public async getPosts(userId: number): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.posts;
  }

  public delete(userId): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
