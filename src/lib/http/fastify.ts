import fastify, { FastifyInstance } from 'fastify';
import { Handler } from './handler';
import { errorHandler } from '#Lib/errors';
import { Hooks } from './hooks';

interface FastifyConfig {
  port: number;
  host: string;
  logger: boolean;
}

export class FastifyHttpTransport {
  #app: FastifyInstance;
  #config: FastifyConfig;
  public handler: Handler;
  public hooks: Hooks;

  constructor(config: FastifyConfig) {
    this.#config = config;
    this.#app = fastify({
      logger: this.#config.logger,
    });

    this.hooks = new Hooks();
    this.#registerErrorHandler();
    this.handler = new Handler(this.#app, this.hooks);
  }

  #registerErrorHandler(): void {
    this.#app.setErrorHandler(errorHandler);
  }

  public getInstance(): FastifyInstance {
    return this.#app;
  }

  public async start(): Promise<void> {
    try {
      await this.#app.listen({ port: this.#config.port, host: this.#config.host });
      console.log(`Server is running on http://${this.#config.host}:${this.#config.port}`);
    } catch (err) {
      this.#app.log.error(err);
      process.exit(1);
    }
  }

  public async close(): Promise<void> {
    await this.#app.close();
  }
}
