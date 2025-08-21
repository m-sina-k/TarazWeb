import "dotenv/config";
import "./config/passport.config";
import express from "express";
import cors from "cors";
import { Env } from "./config/env.config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import connctDatabase from "./config/database.config";
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRoutes from "./routes/user.routes";
import transactionRoutes from "./routes/transaction.routes";
import { initializeCrons } from "./crons";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();
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

app.listen(Env.PORT, async () => {
  await connctDatabase();
  await initializeCrons();
  console.log(`Server is running on port ${Env.PORT}`);
});
