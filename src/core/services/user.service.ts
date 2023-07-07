import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  public getById(userId: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  public getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email },  select: { password: true }});
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const isEmail = await this.getByEmail(createUserDto.email);
    if (isEmail) throw new BadRequestException('User with this email already exists');

    const user = this.userRepository.create(createUserDto);

    user.password = await hash(createUserDto.password, 5);

    return this.userRepository.save(user);
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.userRepository.update({ id: userId }, updateUserDto);

    return this.userRepository.findOne({ where: { id: userId } });
  }

  public getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async followCommunity(
    userId: string,
    communityId: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['followedCommunities'],
    });
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
    });

    if (!user || !community) {
      throw new NotFoundException('User or community not found');
    }

    user.followedCommunities = user.followedCommunities ?? [];
    user.followedCommunities.push(community);
    return this.userRepository.save(user);
  }

  public async getFollowedCommunities(userId: string): Promise<Community[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['followedCommunities'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.followedCommunities;
  }

  public async getArticles(userId: string): Promise<Article[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.articles;
  }

  public delete(userId: string): Promise<DeleteResult> {
    return this.userRepository.delete({ id: userId });
  }
}
