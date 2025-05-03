import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de debug (adicione esta parte)
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('\n=== DEBUG REQUEST ===');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Token:', req.headers.authorization?.replace('Bearer ', ''));
    console.log('=====================\n');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();