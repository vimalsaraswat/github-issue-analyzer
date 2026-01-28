import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'issues.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS issues (
    repo TEXT NOT NULL,
    id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    html_url TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (repo, id)
  )
`);

export default db;
