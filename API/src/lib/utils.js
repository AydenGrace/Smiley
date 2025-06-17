import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenCreation = (email, expiresIn = "1d") => {
  return jwt.sign({email}, process.env.SECRET_KEY, {expiresIn});
};
