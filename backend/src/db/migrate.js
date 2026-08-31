require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

// Minimal runner for a hackathon timeline: just replays every .sql file
// in migrations/ in filename order. No up/down tracking table — fine for
// a greenfield project where you control the DB, but don't run this twice
// against a DB that already has the schema (it'll error on CREATE TABLE).
async function runMigrations() {
  const dir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    console.log(`Running migration: ${file}`);
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    await pool.query(sql);
  }

  console.log('Migrations complete.');
  await pool.end();
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
