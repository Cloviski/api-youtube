import express, { NextFunction, Request, Response } from "express";
import { userRoutes } from "./routes/user.routes";
import { videosRoutes } from "./routes/videos.routes";
import { config } from "dotenv";

const app = express();

config();
const cors = require("cors");

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Context-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/videos", videosRoutes);
app.listen(4000);
