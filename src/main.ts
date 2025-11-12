import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips unknown properties
    forbidNonWhitelisted: true, // throws error for extra fields
    transform: true, // auto-transform types (e.g. string to number)
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
