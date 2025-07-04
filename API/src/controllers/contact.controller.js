import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import UserArchive from "../models/user-archive.model.js";
import {sendContactForm, sendDeleteAccountEmail} from "../emails/email.js";
import bcrypt from "bcryptjs";
import {BLUE, RED, RESET} from "../lib/terminalColors.js";

export const send = async (req, res) => {
  try {
    console.log(req.body);

    await sendContactForm(req.body);
    res.status(200).json({message: "Message envoyé avec succès !", ok: true});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}contact.send()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};
