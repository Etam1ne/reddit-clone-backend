import { Module } from '@nestjs/common';
import { AuthModule } from 'src/api/auth/auth.module';
import { ApiModule } from './api/api.module';
import { PostgresModule } from 'src/infra/postgres/postgres.module';


@Module({
  imports: [PostgresModule, AuthModule, ApiModule],
})
export class AppModule {}
