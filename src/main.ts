import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
const port = process.env.DEV_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(port);
  console.log(`Server is listening on port: ${port}`);
}
bootstrap();
