// import { drizzle as drizzlePgsql } from "drizzle-orm/vercel-postgres";
// import * as schema from "./schema.js";

// const drizzle = drizzlePgsql({
//   casing: "snake_case",
//   schema,
// });

// export default drizzle;


import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default drizzle(pool, { schema });