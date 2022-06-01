import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from '../config/typeorm.config'
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
