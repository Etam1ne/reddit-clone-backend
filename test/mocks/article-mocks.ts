import { Article } from 'src/models/article/entities/article.entity';
import { faker } from '@faker-js/faker';
import { mockUser } from './user-mocks';
import { mockCommunity } from './community-mocks';

export const mockArticle: Article = {
  id: faker.string.uuid(),
  header: faker.lorem.lines(1),
  image: faker.internet.url(),
  textContent: faker.lorem.paragraph(),

  user: mockUser,
  community: mockCommunity,
  comments: [],
  votes: [],

  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
