import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createDocumentSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  createDocumentSwagger(app);

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
