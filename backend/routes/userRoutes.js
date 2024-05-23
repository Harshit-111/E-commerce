import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  loginUser,
  logotUser,
  updateCurrentUserProfile,
  updateUserById,
} from "../controllers/userControllers.js";

import {
  authenticate,
  AutherisedAsAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, AutherisedAsAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logotUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
//Admin routes
router
  .route("/:id")
  .delete(authenticate, AutherisedAsAdmin, deleteUserById)
  .get(authenticate, AutherisedAsAdmin, getUserById)
  .put(authenticate, AutherisedAsAdmin, updateUserById);

export default router;
