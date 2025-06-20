import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) return res.status(401).json({message: "Accès non authorisé."});

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);

    if (!decoded)
      return res
        .status(401)
        .json({message: "Accès non authorisé. Token invalide."});

    const user = await User.findById(decoded.content)
      .select("-password")
      .populate("role");
    if (!user)
      return res
        .status(401)
        .json({message: "Accès non authorisé. Utilisateur inconnu."});

    req.user = user;
    next();
  } catch (error) {
    console.log("ProtectRoute error :", error);
    res.status(500);
  }
};

export const protectAdminRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) return res.status(401).json({message: "Accès non authorisé."});

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded)
      return res
        .status(401)
        .json({message: "Accès non authorisé. Token invalide."});

    const user = await User.findById(decoded.content)
      .select("-password")
      .populate("role");
    if (!user)
      return res
        .status(401)
        .json({message: "Accès non authorisé. Utilisateur inconnu."});

    console.log(user);

    if (user.role.name !== "ADMIN")
      return res
        .status(401)
        .json({message: "Accès non authorisé. Droits insuffisants."});

    req.user = user;
    next();
  } catch (error) {
    console.log("ProtectAdminRoute error :", error);
    res.status(500);
  }
};
