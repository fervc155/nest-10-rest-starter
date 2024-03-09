import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from 'path';
import * as express from 'express';


 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.enableCors()
  
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));


  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

  const config = new DocumentBuilder()
    .setTitle("Ecommerce")
    .setDescription("The ecommerce API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);


  await app.listen(5001);
}
bootstrap();
