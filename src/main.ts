import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Supprime les champs NON autorisés
      forbidNonWhitelisted: true,   // Renvoie une erreur si un champ est interdit
      transform: true,              // Convertit automatiquement les types (ex: id string → number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
