import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express/adapters';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  );
  
  const configService = app.select(SharedModule).get(ApiConfigService);
  const PORT = configService.config.port || 8080;
  
  if (configService.documentation.isEnabled)
    setupSwagger(app, PORT);
  
  await app.listen(PORT);

  console.info(`server is running in: http://localhost:${PORT}`);

  return app;
}
void bootstrap();
