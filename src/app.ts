import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./app/middlewares/logger";
import { envVars } from "./config/env";
import router from "./route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFoundError";

const app = express();

// //middlewares

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(logger);

//   //routing

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "🚌 Transport management module server is running ..",
    enviroment: envVars.NODE_ENV,
    uptime: process.uptime().toFixed(2) + " Seconds",
    timeStamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
