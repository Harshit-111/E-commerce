import express from "express";
import {
  authenticate,
  AutherisedAsAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();
router.route("/").post(authenticate, AutherisedAsAdmin, createCategory);
router.route("/categories").get(getAllCategories);
router
  .route("/:id")
  .put(authenticate, AutherisedAsAdmin, updateCategory)
  .delete(authenticate, AutherisedAsAdmin, deleteCategory)
  .get(getCategory);

export default router;
