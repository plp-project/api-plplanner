import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function createDocumentSwagger(app: INestApplication) {
  const configSwagger = new DocumentBuilder()
    .setTitle('API PLPlanner')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);
}
