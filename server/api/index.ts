import "dotenv/config";
import "../src/config/passport.config";
import express from "express";
import cors from "cors";
import { Env } from "../src/config/env.config";
import { errorHandler } from "../src/middlewares/error-handler.middleware";
import connctDatabase from "../src/config/database.config";
import authRoutes from "../src/routes/auth.routes";
import passport from "passport";
import { passportAuthenticateJwt } from "../src/config/passport.config";
import userRoutes from "../src/routes/user.routes";
import transactionRoutes from "../src/routes/transaction.routes";
import analyticsRoutes from "../src/routes/analytics.routes";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();
// BASE_PATH is always /api - Vercel routes preserve the full path
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(passport.initialize());

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);
app.use(`${BASE_PATH}/analytics`, passportAuthenticateJwt, analyticsRoutes);

app.use(errorHandler);

// Initialize database connection (will be reused across invocations)
let dbConnected = false;
const ensureDbConnection = async () => {
  if (!dbConnected) {
    await connctDatabase();
    dbConnected = true;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureDbConnection();
  return app(req, res);
}
