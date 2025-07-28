import User from "./models/user.model.js";
import Role from "./models/role.model.js";
import Status from "./models/status.model.js";
import {BLUE, RED, RESET, YELLOW} from "./lib/terminalColors.js";
import bcrypt from "bcryptjs";

export const init = async () => {
  try {
    console.log(
      `[${YELLOW}INIT${RESET}]${BLUE} Step 1) Admin Account.${RESET}`
    );
    await createAdmin();
    console.log(
      `[${YELLOW}INIT${RESET}]${BLUE} Step 2) Default Status.${RESET}`
    );
    await createDefaultStatus();
  } catch (error) {
    console.log(`${RED}Error in ${BLUE}Init${RED} function : ${RESET}`, error);
  }
};

const createAdmin = async () => {
  const adminRole = await Role.findOne({name: "ADMIN"});
  if (!adminRole)
    return console.log(
      `[${YELLOW}INIT${RESET}]${RED} -> Error : ADMIN role not found.${RESET}`
    );

  const adminAlreadyExist = await User.findOne({
    role: adminRole._id,
    email: {$not: /@SmileyArchived/i},
  });
  if (adminAlreadyExist)
    return console.log(
      `[${YELLOW}INIT${RESET}]${BLUE} -> ADMIN found. Step canceled.${RESET}`
    );

  const defautlAdmin = new User({
    email: process.env.ADMIN_MAIL,
    fullname: "ADMINISTRATOR",
    password: await bcrypt.hash(process.env.ADMIN_PWD, 10),
    role: adminRole._id,
  });

  await defautlAdmin.save();

  return console.log(
    `[${YELLOW}INIT${RESET}]${BLUE} -> Default Admin created.${RESET}`
  );
};

const createDefaultStatus = async () => {
  // Get Status
  await createSpeficicStatus(
    "En attente",
    "Votre commande est en attente de traitement."
  );
  await createSpeficicStatus(
    "En préparation",
    "Votre commande est en cours de préparation."
  );
  await createSpeficicStatus(
    "En livraison",
    "Votre commande est en cours de livraison."
  );
  await createSpeficicStatus("Livré", "Votre commande est arrivée à bon port.");
  await createSpeficicStatus("Annulée", "Votre commande a été annulée.");
};

const createSpeficicStatus = async (title, desc) => {
  // Verify Exist
  if (await Status.findOne({title}))
    return console.log(
      `[${YELLOW}INIT${RESET}]${BLUE} -> Status "${title}" found.${RESET}`
    );

  await Status.create({title, desc});
  console.log(
    `[${YELLOW}INIT${RESET}]${BLUE} -> Status "${title}" created.${RESET}`
  );
};
