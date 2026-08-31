const { Pool } = require('pg');

// Works with hosted free-tier Postgres (Supabase / Neon / Railway) —
// they all sit behind a single DATABASE_URL connection string, and most
// require SSL, hence the conditional ssl config below.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
  process.exit(1);
});

module.exports = pool;
