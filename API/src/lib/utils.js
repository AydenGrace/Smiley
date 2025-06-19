import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenCreation = (content, expiresIn = "1d", res = null) => {
  const token = jwt.sign({content}, process.env.SECRET_KEY, {expiresIn});

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
  let number = Number(
    expiresIn
      .split("")
      .filter((s) => s >= "0" && s <= "9")
      .join("")
  );
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

export const validatePassword = (
  password = "",
  min_number = 1,
  min_special_char = 1,
  min_upper_char = 1,
  min_lower_char = 1,
  min_total_char = 12
) => {
  const REGEX_SPECIAL =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  const REGEX_CAPITAL = /[A-Z]/g;
  const REGEX_MINUSCULE = /[a-z]/g;
  const REGEX_NUMBER = /[1-9]/g;

  const pass = password.trim();

  console.log(pass.match(REGEX_SPECIAL));

  if (
    !pass.match(REGEX_SPECIAL) ||
    pass.match(REGEX_SPECIAL)?.length < min_special_char
  )
    return false;
  if (
    !pass.match(REGEX_CAPITAL) ||
    pass.match(REGEX_CAPITAL)?.length < min_upper_char
  )
    return false;
  if (
    !pass.match(REGEX_MINUSCULE) ||
    pass.match(REGEX_MINUSCULE)?.length < min_lower_char
  )
    return false;
  if (
    !pass.match(REGEX_NUMBER) ||
    pass.match(REGEX_NUMBER)?.length < min_number
  )
    return false;
  if (!pass || pass.length < min_total_char) return false;

  return true;
};
