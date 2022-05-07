import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './system/auth/auth.module';
import { TableModule } from './system/tables/table.module';
import { UtilModule } from './system/util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UtilModule,
    TableModule,
    AuthModule,
  ]
})
export class AppModule { }
