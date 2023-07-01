import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getById(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  public create(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.username = body.username;
    user.email = body.email;
    user.userImage = body.userImage;

    return this.repository.save(user);
  }

  public getAll(): Promise<User[]> {
    return this.repository.find();
  }
}
