import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      req.user = await userModel
        .findById(decodedToken.userId)
        .select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised token not found");
  }
});

const AutherisedAsAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("not authorised as admin");
  }
};

export { authenticate, AutherisedAsAdmin };
