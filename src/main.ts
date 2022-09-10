import fastifyCookie from '@fastify/cookie';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { MainModule } from './main.module';

import generateSwaggerDocument from '@infrastructure/swagger/swagger.generator';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

  const config = new DocumentBuilder()
    .setTitle('헬신 ')
    .setDescription('헬신 API 설명서')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: true, credentials: true });

  await app.register(fastifyCookie, { secret: process.env.APP_SECRET || '' });

  SwaggerModule.setup('docs', app, generateSwaggerDocument(app), {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
