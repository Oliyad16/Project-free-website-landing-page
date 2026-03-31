import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Server-only — never import in client components
const connectionString = process.env.DATABASE_URL!;

// Use a connection pool for most queries
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

export type DB = typeof db;
