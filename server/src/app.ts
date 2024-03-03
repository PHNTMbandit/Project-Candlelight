import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import env from "./util/validateEnv";
import session from "express-session";
import userRoutes from "./routes/user";
import MongoStore from "connect-mongo";
import notesRoutes from "./routes/notes";
import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import { requiresAuth } from "./middleware/auth";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

app.use((res, req, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error();
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
