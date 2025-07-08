import request from "supertest";
import express from "express";
import authAPI from "../src/routes/auth.route.js";
import dotend from "dotenv";
const mockingoose = require("mockingoose");

// jest.mock("../src/models/user.model.js", () => {
//   const mockQuery = {
//     populate: jest.fn().mockReturnThis(),
//     exec: jest.fn(),
//     select: jest.fn().mockReturnThis(),
//     sort: jest.fn().mockReturnThis(),
//     limit: jest.fn().mockReturnThis(),
//     skip: jest.fn().mockReturnThis(),
//   };

//   return {
//     findOne: jest.fn(() => mockQuery),
//     findById: jest.fn(() => mockQuery),
//     find: jest.fn(() => mockQuery),
//     create: jest.fn(),
//     findByIdAndUpdate: jest.fn(() => mockQuery),
//     findByIdAndDelete: jest.fn(() => mockQuery),
//     // Exposer le mockQuery pour pouvoir le configurer dans les tests
//     __mockQuery: mockQuery,
//   };
// });

import User from "../src/models/user.model.js";

dotend.config();
const app = express();
app.use(express.json());
app.use("/auth", authAPI);

describe("Authenticate", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  test("should be logged", async () => {
    // Object simulé
    const mockedUser = {
      _id: "68554adea25ed5041841f316",
      fullname: "testuser",
      email: "test@example.com",
      password: "$2b$10$39i8u1jgywjsMjwmqpqsYumOnX9xpGO0YJxCSayjLdLoHh0Xvdmce",
      token_modify: null,
      role: {_id: "68554adea25ed5041841f316", name: "TEST"},
      createdAt: "2025-07-08T11:14:54.529Z",
    };
    // force le retour de l'objet simulé sur un findOne
    mockingoose(User).toReturn(mockedUser, "findOne");

    //Requête
    const response = await request(app).post("/auth/signin").send({
      email: "test@example.com",
      password: "$2b$10$hashedpassword",
    });

    //Vérification
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      _id: mockedUser._id,
      fullname: mockedUser.fullname,
      email: mockedUser.email,
      isEmailMod: false,
      role: mockedUser.role._id,
      createdAt: mockedUser.createdAt,
    });
  });

  test("should be Invalid credentials (email)", async () => {
    // force le retour de l'objet simulé sur un findOne
    mockingoose(User).toReturn(null, "findOne");

    //Requête
    const response = await request(app).post("/auth/signin").send({
      email: "test@exmple.com",
      password: "$2b$10$hashedpassword",
    });

    //Vérification
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });

  test("should be Invalid credentials (password)", async () => {
    // Object simulé
    const mockedUser = {
      _id: "68554adea25ed5041841f316",
      fullname: "testuser",
      email: "test@example.com",
      password: "$2b$10$39i8u1jgywjsMjwmqpqsYumOnX9xpGO0YJxCSayjLdLoHh0Xvdmce",
      token_modify: null,
      role: {_id: "68554adea25ed5041841f316", name: "TEST"},
      createdAt: Date.now(),
    };
    // force le retour de l'objet simulé sur un findOne
    mockingoose(User).toReturn(mockedUser, "findOne");

    //Requête
    const response = await request(app).post("/auth/signin").send({
      email: "test@example.com",
      password: "$2b$10$hashdpassword",
    });

    //Vérification
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
