import { fastifyCookie } from '@fastify/cookie';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';
import * as fastifyMultipart from 'fastify-multipart';

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

  app.enableCors({ origin: true, credentials: true });

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'ap-northeast-2',
  });

  SwaggerModule.setup('docs', app, generateSwaggerDocument(app), {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.register(fastifyCookie, { secret: process.env.APP_SECRET || '' });
  await app.register(fastifyMultipart);
  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
