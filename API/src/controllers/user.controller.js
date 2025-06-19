import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import UserArchive from "../models/user-archive.model.js";
import {tokenCreation, validateEmail} from "../lib/utils.js";
import {sendChangeEmail} from "../emails/email.js";
import bcrypt from "bcryptjs";

export const deleteAccount = async (req, res) => {
  try {
    const {id} = req.params;
    const userToDelete = await User.findById(id).populate("role");

    if (!userToDelete)
      return res.status(404).json({message: "User not found."});
    //Verify if it's my account
    if (userToDelete._id !== req.user._id) {
      //verify if admin power
      if (req.user.role.name !== "ADMIN") {
        return res
          .status(401)
          .json({message: "You need admin power to delete this account."});
      }
    }
    const userOrders = await Order.findOne({client: userToDelete._id});
    if (!userOrders) {
      await User.findByIdAndDelete(userToDelete._id);
      return res.status(200).json({message: "User deleted."});
    }

    //Archive user datas
    const archivedUser = new UserArchive({
      email: userToDelete.email,
      fullname: userToDelete.fullname,
    });
    await archivedUser.save();
    let archiveString = archivedUser._id + "@Smiley";
    const newUserDatas = await User.findByIdAndUpdate(
      userToDelete._id,
      {
        email: archiveString,
        fullname: archiveString,
        password: await bcrypt.hash(process.env.SECRET_KEY, 10),
      },
      {new: true}
    );
    return res
      .status(200)
      .json({message: "User archived.", user: newUserDatas});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.deleteAccount()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const updateAccount = async (req, res) => {
  try {
    const {id} = req.params;
    const {fullname} = req.body;
    const userToUpdate = await User.findById(id).populate("role");

    if (!userToUpdate)
      return res.status(404).json({message: "User not found."});
    //Verify if it's my account
    if (!userToUpdate._id.equals(req.user._id)) {
      return res
        .status(401)
        .json({message: "You can only modify your account."});
    }

    //Want modify fullname
    if (fullname && fullname !== userToUpdate.fullname) {
      userToUpdate.fullname = fullname;
    }

    await userToUpdate.save();

    return res.status(200).json({message: "Account updated."});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.updateAccount()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const changeEmail = async (req, res) => {
  try {
    const {id} = req.params;
    const {email} = req.body;

    if (!req.user._id.equals(id))
      return res
        .status(401)
        .json({message: "You can only modify you account."});

    const user = await User.findById(id);
    if (!user) return res.status(404).json({message: "User not found."});

    if (!email || !validateEmail(email))
      return res.status(400).json({message: "Please use a correct email."});

    if (user.email === email)
      return res.status(400).json({messae: "Email not modified."});
    const token = tokenCreation(email, "1h");

    await User.findByIdAndUpdate(id, {token_modify: token});

    await sendChangeEmail(email, token);
    return res
      .status(200)
      .json({message: "Confirmation email sent. Please check your emails."});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.changeEmail()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

export const getInfos = async (req, res) => {
  try {
    const {id} = req.params;

    console.log(req.user);

    if (!req.user._id.equals(id)) {
      if (req.user.role.name !== "ADMIN") {
        return res.status(401).json({
          message: "You need to be an administrator to see this account",
        });
      }
    }
    const user = await User.findById(id);

    if (!user) return res.status(404).json({message: "User not found."});

    return res.status(200).json(user);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Auth.changeEmail()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};
