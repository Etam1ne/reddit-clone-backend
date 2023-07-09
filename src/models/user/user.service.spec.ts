import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCreateUserDto, mockUser } from '../../../test/mocks/user-mocks';
import { Community } from '../community/entities/community.entity';
import { hash } from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let communityRepository: Repository<Community>; // eslint-disable-line

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Community),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    communityRepository = module.get<Repository<Community>>(
      getRepositoryToken(Community),
    );
  });

  describe('Creating a user', () => {
    it('should create a new user', async () => {
      const getByEmailMock = jest
        .spyOn(userService, 'getByEmail')
        .mockResolvedValue(null);

      const createMock = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(mockUser);

      mockUser.password = await hash(mockUser.password, 5);

      const saveMock = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(mockUser);

      const createdUser = await userService.create(mockCreateUserDto);

      expect(createMock).toBeCalledWith(mockCreateUserDto);
      expect(getByEmailMock).toHaveBeenCalledWith(mockCreateUserDto.email);
      expect(saveMock).toHaveBeenCalledWith(createdUser);
      expect(createdUser).toEqual(mockUser);
    });

    it('should return BadRequestException', async () => {
      const existingUser = { email: mockCreateUserDto.email } as User;

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(existingUser);

      expect(userService.create(mockCreateUserDto)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('Finding user by id', () => {
    it('should return user by id', async () => {
      const findOneMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockUser);

      const gettedUser = await userService.getById(mockUser.id);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(gettedUser).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      const findOneMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      const gettedUser = await userService.getById(mockUser.id);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(gettedUser).toBeNull();
    });
  });
});
