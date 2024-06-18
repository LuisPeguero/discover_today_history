import * as errsole from 'errsole';
import * as ErrsoleSequelize from 'errsole-sequelize';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

errsole.initialize({
  storage: new ErrsoleSequelize({
    dialect: 'sqlite',
    storage: './logs.sqlite',
  }),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    rawBody: true,
  });
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
