import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from "express-session"

declare module "express-session" {
  interface SessionData {
    code: string
    email: string
    regCode: string
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //跨域
  app.enableCors({
    origin: "http://localhost:8080",
    credentials: true
  })
  //全局验证管道
  app.useGlobalPipes(new ValidationPipe)
  //设置前缀
  // app.setGlobalPrefix("/api")

  app.use(session({
    secret: "sbppk",
    cookie: { maxAge: 1000 * 60 * 30 },
    resave: false,
    saveUninitialized: true
  }))

  const options = new DocumentBuilder()
    .setTitle('阔哥牛逼')
    .setDescription('阔哥 API 文档')
    .setVersion('1.0')
    // .addSecurity("",{})
    // .addCookieAuth("token")
    // .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  // 设置 swagger 网址
  SwaggerModule.setup('docs', app, document);
  await app.listen(9095);
}
bootstrap();
