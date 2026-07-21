import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Use a connection string from environment variables or a fallback for local dev
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/bedroom_db';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
