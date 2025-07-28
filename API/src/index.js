import express from "express";

import dotenv from "dotenv";
import {connectionDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import roleAPI from "./routes/role.route.js";
import MediaTypeAPI from "./routes/media-type.route.js";
import ArticleTypeAPI from "./routes/article-type.route.js";
import authAPI from "./routes/auth.route.js";
import userAPI from "./routes/user.route.js";
import mediaAPI from "./routes/media.route.js";
import articleAPI from "./routes/article.route.js";
import orderAPI from "./routes/order.route.js";
import contactAPI from "./routes/contact.route.js";
import statsAPI from "./routes/stats.route.js";
import StatusAPI from "./routes/status.route.js";

import {init} from "./init.js";

import path from "path";

const __DIRNAME = path.resolve();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONT, "http://localhost"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.static(path.join(__DIRNAME, "CLIENT/dist")));

app.use("/role", roleAPI);
app.use("/media-type", MediaTypeAPI);
app.use("/article-type", ArticleTypeAPI);
app.use("/auth", authAPI);
app.use("/user", userAPI);
app.use("/media", mediaAPI);
app.use("/article", articleAPI);
app.use("/order", orderAPI);
app.use("/contact", contactAPI);
app.use("/stats", statsAPI);
app.use("/status", StatusAPI);

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__DIRNAME, "CLIENT", "dist", "index.html"));
});

//INIT DATAS
init();

app.listen(process.env.PORT, () => {
  console.log("Server is running.");
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${process.env.PORT}/`);
  connectionDB();
});
