import { Router } from "express";
import {
	signinUser,
	signupUser,
	logoutUser,
	getProfile,
	deleteUser,
} from "../controllers/user.controller";
import isLoggedIn from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.route("/signup").post(upload.single("avatar"), signupUser);
router.route("/signin").post(signinUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(isLoggedIn, getProfile);
router.route("/delete").delete(isLoggedIn, deleteUser);

export default router;
