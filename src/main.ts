import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.DEV_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server is listening on port: ${port}`);
}
bootstrap();
