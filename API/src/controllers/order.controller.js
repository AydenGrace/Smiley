import {BLUE, RED, RESET} from "../lib/terminalColors.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getMyOrders = async (req, res) => {
  try {
    res.status(200).json(await Order.find({client: req.user._id}));
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Role.deleteOne()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};
