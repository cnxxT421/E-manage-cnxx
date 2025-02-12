import { Router } from "express";
import {
	createEvent,
	deleteEvent,
	getAllEvents,
	getEvent,
	joinEvent,
	leaveEvent,
	updateEvent,
} from "../controllers/event.controller";
import isLoggedIn from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.route("/").get(getAllEvents);

router.use(isLoggedIn);
router.route("/").post(upload.single("image"), createEvent);
router.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);

router.route("/join/:id").patch(joinEvent);
router.route("/leave/:id").patch(leaveEvent);

export default router;
