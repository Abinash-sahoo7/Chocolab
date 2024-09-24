import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseURI = process.env.DATABASE_URL as string;

export const connection = postgres(databaseURI);

export const db = drizzle(connection);
