import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { User } from 'src/user/user.entity';
import { Community } from 'src/community/community.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  public async create(
    communityId: number,
    userId: number,
    createPostDto: CreatePostDto,
  ) {
    const post = new Post();

    post.header = createPostDto.header;
    post.image = createPostDto.image;
    post.textContent = createPostDto.textContent;

    const user = await this.userRepository.findOne({ where: { userId } });
    const community = await this.communityRepository.findOne({
      where: { communityId },
    });

    post.user = user;
    post.community = community;
    post.comments = [];

    return this.postRepository.save(post);
  }

  public async update(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    await this.postRepository.update(postId, updatePostDto);

    return this.postRepository.findOne({ where: { postId } });
  }

  public delete(postId: number): Promise<DeleteResult> {
    return this.postRepository.delete(postId);
  }
}
