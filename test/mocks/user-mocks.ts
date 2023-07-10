import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { faker } from '@faker-js/faker';
import { User } from 'src/models/user/entities/user.entity';
import { NoPasswordUser } from 'src/common/types/nopassword-user.type';
import { UpdateUserDto } from 'src/common/dtos/update-user.dto';

export const mockUser: User = {
  id: faker.string.uuid(),
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),

  comments: [],
  articles: [],
  followedCommunities: [],

  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};

export const mockCreateUserDto: CreateUserDto = {
  ...mockUser,
};

export const mockUserNoPassword: NoPasswordUser = {
  ...mockUser,
};

export const mockUpdateUserDto: UpdateUserDto = {
  ...mockUser,
  username: faker.person.firstName(),
};
