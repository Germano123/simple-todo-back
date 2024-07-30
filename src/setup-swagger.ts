import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../package.json';

export function setupSwagger(app: INestApplication, port: number): void {
    const options = new DocumentBuilder()
    .setTitle('Backend Boilerplate API')
    .setDescription('Back end API.')
    .setVersion(version)
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);

    console.info(`documentation is running in: http://localhost:${port}/documentation`);
}
