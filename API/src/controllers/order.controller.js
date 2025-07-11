import {BLUE, RED, RESET} from "../lib/terminalColors.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Address from "../models/address.model.js";

export const getMyOrders = async (req, res) => {
  try {
    res.status(200).json(await Order.find({client: req.user._id}));
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.getMyOrders()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const makeOrder = async (req, res) => {
  try {
    const {address_delivery, address_billing, articles, discount} = req.body;

    let addressDelivExist = await Address.findOne({
      street: address_delivery.street,
      city: address_delivery.city,
      zip_code: address_delivery.zip_code,
      country: address_delivery.country,
    });
    if (!addressDelivExist) {
      addressDelivExist = new Address({
        street: address_delivery.street,
        city: address_delivery.city,
        zip_code: address_delivery.zip_code,
        country: address_delivery.country,
      });
      await addressDelivExist.save();
      console.log(addressDelivExist);
    } else {
      console.log(addressDelivExist._id);
    }
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.makeOrder()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};
