import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import {filters} from '@/app/response/exceptions'
import { APP_GUARD } from '@nestjs/core';
//import { middlewares } from '@/app/middlewares/';
import { JwtMiddleware } from '@/app/middlewares/JwtMiddleware';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';


      
 

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,

    ],
  controllers: [],
  providers: [

    ...filters(),
    //...middlewares()
    
    ],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware('USUARIO')).forRoutes('/users');
  }

}
