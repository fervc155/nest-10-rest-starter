import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as myEntities from '@/app/entities';
import { APP_FILTER } from '@nestjs/core';
import {filters} from '@/app/response/exceptions'
import { APP_GUARD } from '@nestjs/core';
import { middlewares } from '@/app/middlewares/';

import { UserModule } from './modules/user/user.module';

//load entities
const e=[]
for (const EntityClass of Object.values(myEntities)) {
  e.push(EntityClass)
}

  
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: e,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,

    ],
  controllers: [],
  providers: [

    ...filters(),
    ...middlewares()
    
    ],
})
export class AppModule {}
