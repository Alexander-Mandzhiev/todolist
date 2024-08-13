import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger } from '@nestjs/common';

const logger = new Logger()

async function bootstrap() {

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'todolist-queue',
        noAck: true,
        queueOptions: {
          durable: true
        }
      }
    }
  );

  microservice.listen();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by', 'X-Powered-By');

  app.setGlobalPrefix('api')
  app.use(cookieParser())

  await app.listen(process.env.API_PORT)
  logger.log(`server starting ${process.env.API_PORT}`)
}
bootstrap();
