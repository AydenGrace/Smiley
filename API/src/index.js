import express from "express";

import dotenv from "dotenv";
import {connectionDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testAPI from "./routes/test.route.js";
import roleAPI from "./routes/role.route.js";
import MediaTypeAPI from "./routes/media-type.route.js";
import ArticleTypeAPI from "./routes/article-type.route.js";
import authAPI from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONT);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());
app.use("/test", testAPI);
app.use("/role", roleAPI);
app.use("/media-type", MediaTypeAPI);
app.use("/article-type", ArticleTypeAPI);
app.use("/auth", authAPI);

app.listen(process.env.PORT, () => {
  console.log("Server is running.");
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${process.env.PORT}/api/`);
  connectionDB();
});
