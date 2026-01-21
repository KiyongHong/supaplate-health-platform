import postgres from 'postgres';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = postgres(connectionString);

async function main() {
  try {
    console.log('Enabling vector extension...');
    await sql`CREATE EXTENSION IF NOT EXISTS vector`;
    console.log('Successfully enabled vector extension');
  } catch (error) {
    console.error('Error enabling vector extension:', error);
  } finally {
    await sql.end();
  }
}

main();
