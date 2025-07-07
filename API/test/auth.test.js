import mongoose from "mongoose";
import dotenv from "dotenv";
import request from "supertest";
import express from "express";

import authRoute from "../src/routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/auth", authRoute);

describe("Authenticate", () => {
  beforeEach((done) => {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  it("should be login", (done) => {
    request(app)
      .post("/auth/signin")
      .send({
        email: "admin@smiley.fr",
        password: "Crapie110597#@&%$",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (res.status === 400) return done("Mauvais Email et/ou Password");
        if (err) return done(res.body.error);

        assert.notEqual(res.body.message, "Mauvais Email et/ou Password");
        return done();
      });
  });
});
