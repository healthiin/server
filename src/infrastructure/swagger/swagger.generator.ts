import { NestApplication } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { tags } from '@infrastructure/swagger/swagger.tags';

const document = new DocumentBuilder()
  .setTitle(`헬신 API`)
  .setDescription('헬신 API 문서')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .addServer(process.env.APP_URL || 'http://localhost:3000')
  .addServer('https://api.be-healthy.life')
  .setVersion('1.0.0');

tags.forEach((tag) => document.addTag(tag.name, tag.description));

export default function generateSwaggerDocument(
  app: NestApplication | NestFastifyApplication,
) {
  return SwaggerModule.createDocument(app, document.build());
}
