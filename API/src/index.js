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
import userAPI from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/test", testAPI);
app.use("/role", roleAPI);
app.use("/media-type", MediaTypeAPI);
app.use("/article-type", ArticleTypeAPI);
app.use("/auth", authAPI);
app.use("/user", userAPI);

app.listen(process.env.PORT, () => {
  console.log("Server is running.");
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${process.env.PORT}/`);
  connectionDB();
});
