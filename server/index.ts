import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import env from "./src/util/validateEnv";
import session from "express-session";
import userRoutes from "./src/routes/user";
import tasksRoutes from "./src/routes/tasks";
import MongoStore from "connect-mongo";
import notesRoutes from "./src/routes/notes";
import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import { requiresAuth } from "./src/middleware/auth";

const app = express();
const port = env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "https://project-candlelight.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose.connect(env.MONGO_CONNECTION_STRING);

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);
app.use("/api/tasks", requiresAuth, tasksRoutes);

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

app.listen(port, () => {
  console.log(`Server started on port:${port}`);
});

module.exports = app;

export default app;
