import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockCreateUserDto,
  mockUpdateUserDto,
  mockUser,
  mockUserNoPassword,
} from '../../../test/mocks/user-mocks';
import { Community } from '../community/entities/community.entity';
import { hash } from 'bcrypt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mockCommunity } from '../../../test/mocks/community-mocks';
import { mockArticle } from '../../../test/mocks/article-mocks';

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
          useClass: Repository,
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

  describe('Finding user by email', () => {
    it('Should return user with password', async () => {
      const gettedByEmailMock = {
        id: mockUser.id,
        email: mockUser.email,
        password: mockUser.password,
      } as User;

      const findOneMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(gettedByEmailMock);

      const gettedUser = await userService.getByEmail(mockUser.email);

      expect(findOneMock).toHaveBeenCalledWith({
        where: { email: mockUser.email },
        select: {
          email: true,
          password: true,
          id: true,
        },
      });
      expect(gettedUser).toEqual(gettedByEmailMock);
    });
    it('should return null if user not found', async () => {
      const findOneMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      const gettedUser = await userService.getByEmail(mockUser.email);

      expect(findOneMock).toHaveBeenCalledWith({
        where: { email: mockUser.email },
        select: {
          email: true,
          password: true,
          id: true,
        },
      });
      expect(gettedUser).toBeNull();
    });
  });

  describe('getting all users', () => {
    it('should return an array of users', async () => {
      const getUsersMock = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue([mockUserNoPassword] as User[]);

      expect(await userService.getAll()).toEqual([mockUserNoPassword]);
      expect(getUsersMock).toHaveBeenCalled();
    });
  });

  describe('Updating user', () => {
    it('should update user with provided values', async () => {
      const updateMock = jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue({ generatedMaps: [], raw: [], affected: 1 });

      const findOneMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({
          ...mockUserNoPassword,
          username: mockUpdateUserDto.username,
        } as User);

      expect(await userService.update(mockUser.id, mockUpdateUserDto)).toEqual({
        ...mockUserNoPassword,
        username: mockUpdateUserDto.username,
      });
      expect(updateMock).toHaveBeenCalledWith(
        { id: mockUser.id },
        mockUpdateUserDto,
      );
      expect(findOneMock).toBeCalledWith({ where: { id: mockUser.id } });
    });

    it('should update no values', async () => {
      const updateMock = jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue({ generatedMaps: [], raw: [], affected: 0 });

      const findOneMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockUserNoPassword as User);

      expect(await userService.update(mockUser.id, mockUpdateUserDto)).toEqual(
        mockUserNoPassword,
      );
      expect(updateMock).toHaveBeenCalledWith(
        { id: mockUser.id },
        mockUpdateUserDto,
      );
      expect(findOneMock).toBeCalledWith({ where: { id: mockUser.id } });
    });
  });

  describe('Follow community', () => {
    it('should add community to user followed communities', async () => {
      const updatedUserMock = {
        ...mockUser,
        followedCommunities: [mockCommunity],
      };

      const getCommunityMock = jest
        .spyOn(communityRepository, 'findOne')
        .mockResolvedValue(mockCommunity);

      const getUserMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockUser);

      const saveMock = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(updatedUserMock);

      expect(
        await userService.followCommunity(mockUser.id, mockCommunity.id),
      ).toEqual(updatedUserMock);
      expect(getCommunityMock).toHaveBeenCalledWith({
        where: { id: mockCommunity.id },
      });
      expect(getUserMock).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        relations: ['followedCommunities'],
      });
      expect(saveMock).toHaveBeenCalledWith(updatedUserMock);
    });
    it('should throw NotFoundException', async () => {
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(null);

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(
        userService.followCommunity(mockUser.id, mockCommunity.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getting followed communities', () => {
    it('should return an array of followed communities', async () => {
      const updatedUserMock = {
        ...mockUser,
        followedCommunities: [mockCommunity],
      };

      const getUserMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(updatedUserMock);

      expect(await userService.getFollowedCommunities(mockUser.id)).toEqual(
        updatedUserMock.followedCommunities,
      );
      expect(getUserMock).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        relations: ['followedCommunities'],
      });
    });
    it('should throw NotFoundException', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(
        userService.getFollowedCommunities(mockUser.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getting articles of the user', () => {
    it('should return an array of posted articles', async () => {
      const updatedUserMock = {
        ...mockUser,
        articles: [mockArticle],
      };

      const getUserMock = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(updatedUserMock);

      expect(await userService.getArticles(mockUser.id)).toEqual(
        updatedUserMock.articles,
      );
      expect(getUserMock).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        relations: ['articles'],
      });
    });
    it('should throw NotFoundException', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(
        userService.getFollowedCommunities(mockUser.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('delete user', () => {
    it('should delete user', async () => {
      const deleteMock = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      expect(await userService.delete(mockUser.id)).toEqual({
        affected: 1,
        raw: [],
      });
      expect(deleteMock).toBeCalledWith({ id: mockUser.id });
    });
  });
});
