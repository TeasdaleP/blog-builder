import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3000;

  const options = new DocumentBuilder()
    .setTitle('Blog Builder Application')
    .setDescription('This is an example blog application for interview purposes only.')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/`, 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('', app, document);
  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
