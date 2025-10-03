import pg from 'postgres';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In development, files are compiled to .commandkit directory, but SQL files remain in src
// So we need to resolve the path relative to the source directory
const queryPath = __dirname.includes('.commandkit')
  ? path.resolve(process.cwd(), 'src', 'utils', 'db', 'init.sql')
  : path.resolve(__dirname, 'init.sql');

const query = fs.readFileSync(queryPath, 'utf8');

const sql = pg(process.env.DATABASE_URL as string);

export async function initdb(): Promise<void> {
  await sql.unsafe(query);
  await runMigrations();
}

async function runMigrations() {
  const migrationsDir = __dirname.includes('.commandkit')
    ? path.resolve(process.cwd(), 'src', 'utils', 'db', 'migrations')
    : path.resolve(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir);
  for (const file of files) {
    if (!file) break;
    if (!file.endsWith('.sql')) continue;
    const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await sql.unsafe(migration);
  }
}

export default sql;
