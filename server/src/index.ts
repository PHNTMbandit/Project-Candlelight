import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import env from "./util/validateEnv";
import session from "express-session";
import userRoutes from "./routes/user";
import tasksRoutes from "./routes/tasks";
import MongoStore from "connect-mongo";
import notesRoutes from "./routes/notes";
import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import { requiresAuth } from "./middleware/auth";
import mongoose from "mongoose";

const app = express();
const port = env.PORT;

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
module.exports = app;

export default app;
