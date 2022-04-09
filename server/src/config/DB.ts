import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
} = process.env;

export const DEFAULT_PAGE_SIZE = Number(process.env.DEFAULT_PAGE_SIZE);

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
