import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppLogger } from './logger/winston-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1', 
  });

  const configService = app.get(ConfigService);
  const logger = app.get(AppLogger);
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('PORT')!;
  logger.log(`Application is starting on port ${port}`);
  await app.listen(port);
}
bootstrap();
