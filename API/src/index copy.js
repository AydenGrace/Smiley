import express from "express";

import dotenv from "dotenv";
import {connectionDB} from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("Server is running.");
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${process.env.PORT}/api/`);
  connectionDB();
});
