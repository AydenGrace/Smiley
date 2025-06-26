import Article from "../models/article.model.js";
import ArticleType from "../models/article-type.model.js";
import {BLUE, RED, RESET} from "../lib/terminalColors.js";

export const post = async (req, res) => {
  try {
    const {title, desc, price, stock, is_show, is_featured, type, medias} =
      req.body;

    //Verifications
    if (!title)
      return res.status(400).json({message: "A Article need a title."});
    if (!desc)
      return res.status(400).json({message: "A Article need a description."});
    if ((!price && price != 0) || isNaN(price))
      return res.status(400).json({message: "A Article need a correct price."});
    if (price < 0)
      return res.status(400).json({message: "Price must be upper than zero."});
    if ((!stock && stock != 0) || isNaN(stock))
      return res
        .status(400)
        .json({message: "A Article need a correct stock number."});
    if (stock < 0)
      return res.status(400).json({message: "Stock must be upper than zero."});

    if (await Article.findOne({title: title}))
      return res
        .status(400)
        .json({message: "A article already exist with this title."});

    const typeA = await ArticleType.findById(type);
    if (!typeA)
      return res.status(404).json({message: "Article Type not found."});

    let alreadyAMain = false;
    for (let i = 0; i < medias.length; i++) {
      if (!medias[i].url)
        return res.status(400).json({message: "A media need an URL."});

      if (medias[i].is_main) {
        if (!alreadyAMain) alreadyAMain = true;
        else medias[i].is_main = false;
      }
    }
    if (medias.length && !alreadyAMain) medias[0].is_main = true;

    const article = new Article({
      title,
      desc,
      price,
      stock,
      is_show: is_show ? true : false,
      is_featured: is_featured ? true : false,
      type,
      medias,
    });
    await article.save();
    return res.status(201).json(article);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Article.post()${RED} function : ${RESET}`,
      error.message
    );
    res.status(500).json({message: error.message});
  }
};

export const get = async (req, res) => {
  try {
    res.status(200).json(await Article.find().populate("type"));
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Article.post()${RED} function : ${RESET}`,
      error.message
    );
    res.status(500).json({message: error.message});
  }
};
