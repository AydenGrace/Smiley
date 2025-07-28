import Status from "../models/status.model.js";

export const getAll = async (req, res) => {
  try {
    return res.status(200).json(await Status.find());
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Status.getAll()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};
