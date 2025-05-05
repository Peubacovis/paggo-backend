import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';  // Certifique-se de usar a importação correta

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usando o helmet corretamente como middleware
  app.use(helmet());  // O Helmet deve ser usado dessa maneira, como middleware

  // Suporte a cookies (caso esteja usando autenticação com cookies)
  app.use(cookieParser());

  // CORS configurável via variável de ambiente
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  // Validações globais
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || 3002;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
