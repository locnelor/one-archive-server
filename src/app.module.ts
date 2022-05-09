import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './system/admin/admin.controller';
import { AuthModule } from './system/auth/auth.module';
import { BasicModule } from './system/basic/basic.module';
import { LeaderController } from './system/leader/leader.controller';
import { TableModule } from './system/tables/table.module';
import { UtilModule } from './system/util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UtilModule,
    TableModule,
    AuthModule,
    BasicModule
  ],
  controllers: [
    AdminController,
    LeaderController
  ]
})
export class AppModule { }
