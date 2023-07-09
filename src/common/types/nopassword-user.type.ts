import { User } from 'src/models/user/entities/user.entity';

export type NoPasswordUser = Omit<User, 'password'>;
