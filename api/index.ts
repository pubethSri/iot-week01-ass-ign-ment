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
    origin: process.env.CORS_ORIGIN || "*",
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.route("/", apiRouter);

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});