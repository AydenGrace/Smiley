import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import {BLUE, RED, RESET} from "../lib/terminalColors.js";

export const getAll = async (req, res) => {
  try {
    return res.status(200).json(await Role.find());
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Role.getAll()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const getById = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Role.findById(id.trim());
    if (!result) return res.status(404).json({massage: "Role not found."});
    return res.status(200).json(result);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Role.getById()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const postOne = async (req, res) => {
  try {
    const {name} = req.body;
    const alreadyExist = await Role.findOne({name});

    if (alreadyExist)
      return res.status(400).json({message: "Role already exist"});

    const newRole = new Role({name});
    await newRole.save();
    res.status(200).json(newRole);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Role.postOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const patchOne = async (req, res) => {
  try {
    const {name} = req.body;
    const {id} = req.params;
    const alreadyExist = await Role.findById(id);
    const nameAlreadyUse = await Role.findOne({name});

    if (!alreadyExist) return res.status(404).json({message: "Role not found"});

    if (nameAlreadyUse)
      return res
        .status(400)
        .json({message: "A role already exist with this name"});

    const newRole = await Role.findByIdAndUpdate(id, {name}, {new: true});
    res.status(200).json(newRole);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Role.patchOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const deleteOne = async (req, res) => {
  try {
    const {id} = req.params;
    const alreadyUsed = await User.findOne({role: id});

    if (alreadyUsed)
      return res
        .status(400)
        .json({message: "Role already used. You can't delete it."});

    const role = await Role.findById(id);
    if (!role) return res.status(404).json({message: "Role not found."});

    await Role.findByIdAndDelete(id);

    res.status(200).json({message: "Role deleted."});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Role.deleteOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};
