import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from 'src/shared/entities/user.entity';
import { UserService } from 'src/core/services/user.service';
import { Community } from 'src/shared/entities/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Community])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
