import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by', 'X-Powered-By');

  app.setGlobalPrefix('api')
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Todo-List')
    .setDescription('Todo-List - планировщик задач')
    .setVersion('1.0')
    .addTag('Маршруты')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://localhost:3000',
      'https://127.0.0.1:3000'
    ],
    credentials: true,
    exposedHeaders: `set-cookie`
  })

  await app.listen(process.env.API_PORT)
  logger.log(`server starting ${process.env.API_PORT}`)
}
bootstrap()
