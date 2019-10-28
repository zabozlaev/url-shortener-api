import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const expressApp = express();
  expressApp.enable('trust proxy');

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
