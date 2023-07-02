import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getById(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  public getByEmail(email: string): Promise<User> {
    return this.repository.findOne({where: { email }});
  }

  public async create(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.username = body.username;
    user.email = body.email;

    user.password = await hash(body.password, 5);

    return this.repository.save(user);
  }

  public getAll(): Promise<User[]> {
    return this.repository.find();
  }
}
