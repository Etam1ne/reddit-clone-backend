import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { ModelsModule } from './models/models.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    AuthModule,
    ProvidersModule,
    ModelsModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 24000000,
      },
    }),
  ],
})
export class AppModule {}
