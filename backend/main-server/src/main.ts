import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const whitelist = ["http://jaso-ai.com/", "https://jaso-ai.com", "http://localhost:3000", "http://localhost:4000"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        console.log(`Allowed CORS for: ${origin}`);
        callback(null, true);
      } else {
        console.log(`Blocked cors for: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
  });
  await app.listen(4000);
}
bootstrap();
