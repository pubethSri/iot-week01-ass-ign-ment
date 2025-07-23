import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import apiRouter from "./routes/api.js";

import dotenv from "dotenv";
dotenv.config();

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.route("/", apiRouter);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("API server running at http://localhost:3000");
