import ArticleType from "../models/article-type.model.js";
import Article from "../models/article.model.js";
import {BLUE, RED, RESET} from "../lib/terminalColors.js";

export const getAll = async (req, res) => {
  try {
    return res.status(200).json(await ArticleType.find());
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}ArticleType.getAll()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const getById = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await ArticleType.findById(id.trim());
    if (!result)
      return res.status(404).json({massage: "Article Type not found."});
    return res.status(200).json(result);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}ArticleType.getById()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const postOne = async (req, res) => {
  try {
    const {name} = req.body;
    const alreadyExist = await ArticleType.findOne({name});

    if (alreadyExist)
      return res.status(400).json({message: "Article Type already exist"});

    const newArticleType = new ArticleType({name});
    await newArticleType.save();
    res.status(200).json(newArticleType);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}ArticleType.postOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const patchOne = async (req, res) => {
  try {
    const {name} = req.body;
    const {id} = req.params;
    const alreadyExist = await ArticleType.findById(id);
    const nameAlreadyUse = await ArticleType.findOne({name});

    if (!alreadyExist)
      return res.status(404).json({message: "Article Type not found"});

    if (nameAlreadyUse)
      return res
        .status(400)
        .json({message: "A role already exist with this name"});

    const newArticleType = await ArticleType.findByIdAndUpdate(
      id,
      {name},
      {new: true}
    );
    res.status(200).json(newArticleType);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}ArticleType.patchOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const deleteOne = async (req, res) => {
  try {
    const {id} = req.params;
    const alreadyUsed = await Article.findOne({type: id});

    if (alreadyUsed)
      return res
        .status(400)
        .json({message: "Article Type already used. You can't delete it."});

    const role = await ArticleType.findById(id);
    if (!role)
      return res.status(404).json({message: "Article Type not found."});

    await ArticleType.findByIdAndDelete(id);

    res.status(200).json({message: "Article Type deleted."});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}ArticleType.deleteOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};
