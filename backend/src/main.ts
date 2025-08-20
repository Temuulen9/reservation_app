import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
  });
  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      forbidNonWhitelisted: false,
      transform: true, // auto transform payloads
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
