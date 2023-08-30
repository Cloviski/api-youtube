import express from "express";
import { userRoutes } from "./routes/user.routes";
import { videosRoutes } from "./routes/videos.routes";
import { config } from "dotenv";

const app = express();

config(); 
const cors = require("cors");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headres",
    "Origin, X-Requested-With, Context-Type, Accept"
  );
  res.header(
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


