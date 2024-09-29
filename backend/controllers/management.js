import User from "../models/User.js";

export const getAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
