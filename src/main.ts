import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppLogger } from './logger/winston-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI, // Use URI versioning (e.g., /v1/resource)
    defaultVersion: '1', // Default version if no version is specified
  });

  const logger = app.get(AppLogger);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT ?? 3000;
  logger.log(`Application is starting on port ${port}`);
  await app.listen(port);
}
bootstrap();
