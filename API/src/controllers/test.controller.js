import {sendConfirmationEmail} from "../emails/email.js";
import {tokenCreation} from "../lib/utils.js";

export const sendEmail = async (req, res) => {
  try {
    const {email} = req.body;
    const token = tokenCreation(email);
    await sendConfirmationEmail(email, token);
    res.status(200).json({message: "Email send."});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error});
  }
};
