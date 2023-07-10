import { faker } from '@faker-js/faker';
import { Community } from 'src/models/community/entities/community.entity';

export const mockCommunity: Community = {
  id: faker.string.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  image: faker.internet.url(),

  articles: [],
  followers: [],

  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
