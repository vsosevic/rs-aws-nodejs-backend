import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const dbOptions = {
  user: PG_USERNAME,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export class DBConnection {
  private readonly client: Client;

  constructor() {
    this.client = new Client(dbOptions);
  }

  async connect() {
    await this.client.connect();
    return this.client;
  }

  async disconnect() {
    await this.client.end();
  }

}