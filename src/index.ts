import { env } from '#Infrastructure/env';
import { httpTransport } from '#Infrastructure/fastify';
import db from "#Infrastructure/sequelize";
import '#Infrastructure/handlers';

async function bootstrap() {
  try {
    // Подключение переменных окружения
    env.init();
    // Подключение бд
    await db.connectDatabase();
    // Старт сервера
    await httpTransport.start();
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap();
