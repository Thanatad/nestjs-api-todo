import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useStaticAssets(join(__dirname, '..', './public'));

  app.enableCors()

  await app.listen(port);
}
bootstrap();
