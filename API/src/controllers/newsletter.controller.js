import {BLUE, RED, RESET} from "../lib/terminalColors.js";
import Newsletter from "../models/newsletter.schema.js";

export const subscribe = async (req, res) => {
  try {
    const {email} = req.body;
    //Verify already exist
    const alreadySub = await Newsletter.findOne({email});
    if (alreadySub) {
      return res.status(400).json({message: "Adresse déjà enregistrée."});
    }
    const newSub = new Newsletter({email});
    await newSub.save();
    return res
      .status(200)
      .json({message: "Inscription enregistrée avec succès.", ok: true});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Newsletter.subscribe()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const unSubscribe = async (req, res) => {
  try {
    const {email} = req.body;
    //Verify already exist
    const alreadySub = await Newsletter.findOne({email});
    if (!alreadySub) {
      return res.status(404).json({message: "Adresse non trouvée."});
    }
    await Newsletter.findOneAndDelete({email});
    return res
      .status(200)
      .json({message: "Inscription enregistrée avec succès.", ok: true});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Newsletter.subscribe()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const subWithoutRes = async (email) => {
  const alreadySub = await Newsletter.findOne({email});
  if (alreadySub) {
    return false;
  }
  const newSub = new Newsletter({email});
  await newSub.save();
  return true;
};

export const unSubWithoutRes = async (email) => {
  const alreadySub = await Newsletter.findOne({email});
  if (!alreadySub) {
    return false;
  }
  await Newsletter.findOneAndDelete({email});
  return true;
};
