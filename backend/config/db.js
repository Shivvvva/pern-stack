import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin",
  database: "pern",
});

export default pool;
