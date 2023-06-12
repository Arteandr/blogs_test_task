import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Пайп для валидации тела запроса
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true
    }
  ))

  // Инициализация сваггера
  const config = new DocumentBuilder()
    .setTitle('API для тестового задания')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
