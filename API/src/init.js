import User from "./models/user.model.js";
import Role from "./models/role.model.js";
import {BLUE, RED, RESET, YELLOW} from "./lib/terminalColors.js";
import bcrypt from "bcryptjs";

export const init = async () => {
  try {
    console.log(process.env.ADMIN_PWD);

    const adminRole = await Role.findOne({name: "ADMIN"});
    if (!adminRole)
      return console.log(
        `[${YELLOW}INIT${RESET}]${RED} Error : ADMIN role not found.${RESET}`
      );

    const adminAlreadyExist = await User.findOne({role: adminRole._id});
    if (adminAlreadyExist)
      return console.log(
        `[${YELLOW}INIT${RESET}]${BLUE} ADMIN found. Initialisation canceled.${RESET}`
      );

    const defautlAdmin = new User({
      email: process.env.ADMIN_MAIL,
      fullname: "ADMINISTRATOR",
      password: await bcrypt.hash(process.env.ADMIN_PWD, 10),
      role: adminRole._id,
    });

    await defautlAdmin.save();

    return console.log(
      `[${YELLOW}INIT${RESET}]${BLUE} Default Admin created.${RESET}`
    );
  } catch (error) {
    console.log(`${RED}Error in ${BLUE}Init${RED} function : ${RESET}`, error);
  }
};
