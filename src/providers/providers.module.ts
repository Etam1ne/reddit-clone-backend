import { Module } from "@nestjs/common";
import { PostgresModule } from "./database/postgres.module";

@Module({
    imports: [PostgresModule],
})
export class ProvidersModule {};