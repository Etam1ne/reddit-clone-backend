import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [InfraModule, CoreModule, ApiModule],
})
export class AppModule {}
