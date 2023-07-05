import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './use-cases/auth/auth.module';

@Module({
  imports: [ServicesModule, AuthModule],
})
export class CoreModule {}
