import pg from 'postgres';
import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const query = fs.readFileSync(path.join(__dirname, 'src', 'utils', 'db', 'init.sql'), 'utf8');

const sql = pg(process.env.DATABASE_URL as string);

export async function initdb(): Promise<void> {
  await sql.unsafe(query);
  await runMigrations();
}

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'src', 'utils', 'db', 'migrations');
  const files = fs.readdirSync(migrationsDir);
  for (const file of files) {
    if (!file) break;
    if (!file.endsWith('.sql')) continue;
    const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await sql.unsafe(migration);
  }
}

export default sql;
