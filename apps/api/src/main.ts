import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.API_PORT || 3005);
}
bootstrap();

/**
 * Założenia
 *
 * Taski, login(?),
 *
 * Każdy posiada swojego board'a
 * każdy board posiada swojego właściciela (brak kolaboracji)
 *
 * Wszystkie Taski są przypisane do Boarda (nie do uzytkownika)
 * Board ma określone 3/4 sekcje z customową nazwą.
 * Taski można przerzucać przez sekcje drop-downem (front)
 *
 */
