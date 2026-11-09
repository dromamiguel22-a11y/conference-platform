// Shared database connection, used by all serverless functions that
// need to talk to Postgres. Uses the connection string Vercel injected
// automatically when the Neon database was created.
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set — check your Vercel project's environment variables.");
}

export const sql = neon(connectionString);