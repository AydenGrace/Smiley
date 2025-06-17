import MediaType from "../models/media-type.model.js";
import Media from "../models/media.model.js";
import {BLUE, RED, RESET} from "../lib/terminalColors.js";

export const getAll = async (req, res) => {
  try {
    return res.status(200).json(await MediaType.find());
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}MediaType.getAll()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const getById = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await MediaType.findById(id.trim());
    if (!result)
      return res.status(404).json({massage: "Media Type not found."});
    return res.status(200).json(result);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}MediaType.getById()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const postOne = async (req, res) => {
  try {
    const {name} = req.body;
    const alreadyExist = await MediaType.findOne({name});

    if (alreadyExist)
      return res.status(400).json({message: "Media Type already exist"});

    const newMediaType = new MediaType({name});
    await newMediaType.save();
    res.status(200).json(newMediaType);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}MediaType.postOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const patchOne = async (req, res) => {
  try {
    const {name} = req.body;
    const {id} = req.params;
    const alreadyExist = await MediaType.findById(id);
    const nameAlreadyUse = await MediaType.findOne({name});

    if (!alreadyExist)
      return res.status(404).json({message: "Media Type not found"});

    if (nameAlreadyUse)
      return res
        .status(400)
        .json({message: "A role already exist with this name"});

    const newMediaType = await MediaType.findByIdAndUpdate(
      id,
      {name},
      {new: true}
    );
    res.status(200).json(newMediaType);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}MediaType.patchOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const deleteOne = async (req, res) => {
  try {
    const {id} = req.params;
    const alreadyUsed = await Media.findOne({type: id});

    if (alreadyUsed)
      return res
        .status(400)
        .json({message: "Media Type already used. You can't delete it."});

    const role = await MediaType.findById(id);
    if (!role) return res.status(404).json({message: "Media Type not found."});

    await MediaType.findByIdAndDelete(id);

    res.status(200).json({message: "Media Type deleted."});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}MediaType.deleteOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};
