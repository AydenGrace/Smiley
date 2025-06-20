import Media from "../models/media.model.js";
import MediaType from "../models/media-type.model.js";
import Article from "../models/article.model.js";

import {BLUE, RED, RESET} from "../lib/terminalColors.js";

export const post = async (req, res) => {
  try {
    const {url, type} = req.body;
    if (!(await MediaType.findById(type)))
      return res.status(400).json({message: "Type not found."});

    const newMedia = new Media({url, type});
    await newMedia.save();
    res.status(200).json(newMedia);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Media.post()${RED} function : ${RESET}`,
      error.message
    );
    res.status(500).json({message: error.message});
  }
};

export const get = async (req, res) => {
  try {
    const {id} = req.params;
    const media = await Media.findById(id)
      .populate("type", "name")
      .select("-createdAt -updatedAt -__v");
    if (!media) return res.status(404).json({message: "Media not found."});
    return res.status(200).json(media);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Media.get()${RED} function : ${RESET}`,
      error.message
    );
    res.status(500).json({message: error.message});
  }
};

export const patch = async (req, res) => {
  try {
    const {id} = req.params;
    const {url} = req.body;
    if (!url) return res.status(400).json({message: "Please provide an URL."});
    const media = await Media.findById(id).populate("type");
    if (!media) return res.status(404).json({message: "Media not found."});
    if (media.url === url)
      return res.status(400).json({message: "Not modified."});
    media.url = url;
    await media.save();
    return res.status(200).json(media);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Media.patch()${RED} function : ${RESET}`,
      error.message
    );
    res.status(500).json({message: error.message});
  }
};

export const deleteSafe = async (req, res) => {
  try {
    const {id} = req.params;
    const media = await Media.findById(id);
    if (!media) return res.status(404).json({message: "Media not found."});
    //Verify all Articles with this picture
    const articles = await Article.find({
      medias: {$elemMatch: {"media": media}},
    });
    // Loop and save articles without this media
    for (let i = 0; i < articles.length; i++) {
      articles[i].medias = articles[i].medias.filter(
        (med) => !med.media.equals(media)
      );
      await articles[i].save();
    }
    await Media.findByIdAndDelete(id);

    return res.status(200).json({message: "Media Successfully Deleted."});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Media.patch()${RED} function : ${RESET}`,
      error.message
    );
    res.status(500).json({message: error.message});
  }
};
