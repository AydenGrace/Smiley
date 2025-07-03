import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import UserTemp from "../models/tempuser.schema.js";
import UserArchive from "../models/user-archive.model.js";
import {tokenCreation, validatePassword} from "../lib/utils.js";
import {sendConfirmationEmail, sendValidationAccount} from "../emails/email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {RED, BLUE, RESET} from "../lib/terminalColors.js";

export const signUp = async (req, res) => {
  try {
    const {email} = req.body;
    //VERIFY ALREADY EXIST
    let alreadyExist = await User.findOne({email});
    if (alreadyExist)
      return res
        .status(400)
        .json({message: "Account already created with this address."});

    alreadyExist = await UserTemp.findOne({email});
    if (alreadyExist)
      return res.status(400).json({
        message: "Registration already in progress. Please check your emails.",
      });

    //Generate Token
    const token = tokenCreation(email);

    //Create temporary user
    const newUser = new UserTemp({email, token});
    await newUser.save();
    await sendConfirmationEmail(newUser.email, newUser.token);
    res
      .status(200)
      .json({
        message: "Confirmation send. Please check your emails.",
        token: newUser.token,
      });
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.signUp()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const signUpConfirm = async (req, res) => {
  try {
    const {token} = req.params;
    const {fullname, password} = req.body;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    //verify exist
    const tempUser = await UserTemp.findOne({email: decoded.content, token});
    if (!tempUser) return res.status(404).json({message: "User not found"});

    const defaultRole = await Role.findOne({name: "CLIENT"});
    if (!defaultRole)
      return res
        .status(500)
        .json({message: "Can't create account. No default role found."});

    if (!validatePassword(password))
      return res
        .status(400)
        .json({message: "Please use actual RGPD password's norms"});

    const newUser = new User({
      email: decoded.content,
      password: await bcrypt.hash(password, 10),
      fullname,
      role: defaultRole._id,
    });
    await newUser.save();
    await UserTemp.deleteOne({email: newUser.email});
    await sendValidationAccount(tempUser.email);
    res.status(201).json({
      message: "Registration confirmed.",
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const tempUser = await UserTemp.findOne({token});
      if (tempUser) {
        await tempUser.deleteOne({token});
        await sendInvalidEmailToken(tempUser.email);
      }
      return res.redirect(`${process.env.FRONT}/register?message=error`);
    }
    console.log(
      `${RED}Error in ${BLUE}Auth.signUpConfirm()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email}).populate("role");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    tokenCreation(user._id, "7d", res);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      isEmailMod: user.token_modify ? true : false,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.signIn()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const signOut = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged out succesfully",
    });
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.signOut()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const current = async (req, res) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) return res.status(200).json(null);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) return res.status(200).json(null);

    const user = await User.findById(decoded.content)
      .select("-password")
      .populate("role", "name");

    const dto = {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      isEmailMod: user.token_modify ? true : false,
      role: user.role,
      createdAt: user.createdAt,
    };
    if (!user) return res.status(200).json(null);
    return res.status(200).json(dto);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.current()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};
