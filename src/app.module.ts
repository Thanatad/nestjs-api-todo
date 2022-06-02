import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from '../config/typeorm.config'
import { Connection } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
