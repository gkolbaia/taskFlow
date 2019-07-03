import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GenerateTokenMiddleware } from './shared/middlewares/generateToken.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.use(express.static('./public'));
  // app.use(express.static(path.join(__dirname, './public/uploads')));
  app.useStaticAssets(join(__dirname, './public'));
  await app.listen(3000);
}
bootstrap();
