import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenCreation = (email, expiresIn = "1d", res = null) => {
  const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn });

  if (res) {
    res.cookie("jwt", token, {
      maxAge: convertExpireInMilli(expiresIn),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  }

  return token;
};

const convertExpireInMilli = (expiresIn = "") => {
  let number = Number(expiresIn.replace(/^\D+/g, "").trim());
  let type = expiresIn.replace(/\d+/g, "").trim();
  let milli = 1;
  if (!type) return number;
  switch (type) {
    case "min":
    case "m":
      milli = 1000 * 60;
      break;
    case "hours":
    case "h":
      milli = 1000 * 60 * 60;
      break;
    case "days":
    case "d":
      milli = 1000 * 60 * 60 * 24;
      break;
  }
  return milli * number;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
