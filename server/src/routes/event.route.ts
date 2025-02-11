import { Router } from "express";
import {
	createEvent,
	getAllEvents,
	getEvent,
	updateEvent,
} from "../controllers/event.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getAllEvents);
router.route("/").post(isLoggedIn, createEvent);
router.route("/:id").get(getEvent);
router
	.route("/:id")
	.delete(isLoggedIn, createEvent)
	.patch(isLoggedIn, updateEvent);

export default router;
