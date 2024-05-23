import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { generateToken } from "../utils/generateTokens.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("please fill all fields");
  }
  const checkUser = await userModel.findOne({ email: email });
  if (checkUser) {
    res.status(400).json({ message: "user already exists" });
  }
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(400);
    throw new Error("invalid User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) {
    res.status(400).send("user not registered");
  }
  const isValidPassword = await bcrypt.compare(password, checkUser.password);
  if (!isValidPassword) {
    res.status(400).send("incorrect password");
  }
  generateToken(res, checkUser._id);
  res.status(200).json(checkUser);
});

const logotUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    res
      .status(200)
      .json({ id: user._id, name: user.username, email: user.email });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.email) {
      const checkUser = await userModel.findOne({ email: req.body.email });
      if (checkUser) {
        res.status(400).json({ message: "cannot use this email" });
      }
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//Admin Controllers
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("cannot delete admin");
    }
    await userModel.deleteOne({ _id: user._id });
    res.status(200).json({ message: "user deleted" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
const updateUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-password");
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
export {
  createUser,
  loginUser,
  logotUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
