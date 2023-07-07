import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [AuthModule, ProvidersModule, ModelsModule],
})
export class AppModule {}
