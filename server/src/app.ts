import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import notesRoutes from "./routes/notes";
import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

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
