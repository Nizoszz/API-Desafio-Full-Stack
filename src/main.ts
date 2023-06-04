import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Register Clients APP')
    .setDescription('register your clients')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth()
    .addTag('Clients')
    .addBearerAuth()
    .addTag('Contacts')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['hashPassword'] },
    }),
  );
  await app.listen(3000);
}
bootstrap();
