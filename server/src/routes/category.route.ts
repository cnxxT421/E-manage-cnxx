import { Router } from "express";
import {
	addCategory,
	deleteCategory,
	getCategories,
} from "../controllers/category.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getCategories);
router
	.route("/")
	.post(isLoggedIn, addCategory)
	.delete(isLoggedIn, deleteCategory);

export default router;
