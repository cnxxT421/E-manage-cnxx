import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { EventSchema, UpdateEventSchema } from "../schemas/event.schema";
import { deleteFromCloudinary, uploadOnCloudinary } from "../config/cloudinary";
import Event from "../models/event.model";
import { validateDate } from "../utils/date";
import mongoose, { ObjectId, Schema } from "mongoose";
import Category from "../models/category.model";

const createEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const validData = EventSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				"Invalid data format",
				validData.error.format()
			);
			return;
		}

		const {
			title,
			description,
			location,
			url,
			price,
			isFree,
			startDate,
			endDate,
			categoryId,
		} = validData.data;

		const dateValidation = validateDate(startDate, endDate);
		if (!dateValidation.valid) {
			errorResponse(res, 400, dateValidation.message!);
			return;
		}

		const existingCategory = await Category.findOne({ _id: categoryId });
		if (!existingCategory) {
			errorResponse(res, 400, "Category not found");
			return;
		}

		const imageLocalPath = req.file?.path;
		if (!imageLocalPath) {
			errorResponse(res, 400, "Image is required");
			return;
		}

		const imageCloudinaryUrl = await uploadOnCloudinary(imageLocalPath);
		if (!imageCloudinaryUrl) {
			errorResponse(res, 400, "Image upload failed");
			return;
		}

		const event = await Event.create({
			title,
			description,
			location,
			image: imageCloudinaryUrl?.secure_url,
			url,
			price,
			isFree: !price,
			startDate,
			endDate,
			organizer: new mongoose.Types.ObjectId(userId),
			category: existingCategory._id,
		});

		const isCreated = await Event.findOne({ _id: event._id }).populate([
			{
				path: "organizer",
				select: "username",
			},
			{ path: "category", select: "name" },
		]);
		if (!isCreated) {
			errorResponse(res, 500, "Event creation failed");
			return;
		}

		const io = req.app.get("socketio");
		io.emit("eventUpdate", {
			event: isCreated,
			type: "create",
		});

		successResponse(res, 201, "Event created successfully", {
			event: event._id,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const updateEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const eventId = req.params.id;
		const userId = req.user?._id;

		if (!eventId || !userId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const event = await Event.findOne({ _id: eventId, organizer: userId });
		if (!event) {
			errorResponse(res, 404, "Unauthorized to update this event");
			return;
		}

		const now = new Date();
		if (event.startDate < now) {
			errorResponse(
				res,
				400,
				"Cannot update an event that has already started"
			);
			return;
		}
		if (event.endDate < now) {
			errorResponse(
				res,
				400,
				"Cannot update an event that has already ended"
			);
			return;
		}

		const validData = UpdateEventSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				"Invalid data format",
				validData.error.format()
			);
			return;
		}

		const {
			title,
			description,
			location,
			url,
			startDate,
			endDate,
			categoryId,
		} = validData.data;

		const dateValidation = validateDate(startDate, endDate);
		if (!dateValidation.valid) {
			errorResponse(res, 400, dateValidation.message!);
			return;
		}

		const existingCategory = await Category.findOne({ _id: categoryId });
		if (!existingCategory) {
			errorResponse(res, 400, "Category not found");
			return;
		}

		const updatedEvent = await Event.findOneAndUpdate(
			{ _id: eventId, organizer: userId },
			{
				title,
				description,
				location,
				url,
				startDate,
				endDate,
				category: existingCategory._id,
			},
			{ new: true }
		).populate([
			{
				path: "organizer",
				select: "username",
			},
			{ path: "category", select: "name" },
		]);

		const io = req.app.get("socketio");
		io.emit("eventUpdate", {
			event: updatedEvent,
			type: "update",
		});

		successResponse(res, 200, "Event updated successfully", {
			event: updatedEvent,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const eventId = req.params.id;
		const userId = req.user?._id;

		if (!eventId || !userId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const event = await Event.findOne({ _id: eventId, organizer: userId });
		if (!event) {
			errorResponse(res, 404, "Unauthorized to delete this event");
			return;
		}

		const now = new Date();
		if (event.startDate < now) {
			errorResponse(
				res,
				400,
				"Cannot delete an event that has already started"
			);
			return;
		}
		if (event.endDate < now) {
			errorResponse(
				res,
				400,
				"Cannot delete an event that has already ended"
			);
			return;
		}

		const avatarCloudinaryUrl = event.image;
		if (avatarCloudinaryUrl) {
			await deleteFromCloudinary(avatarCloudinaryUrl);
		}
		await Event.findOneAndDelete({ _id: eventId, organizer: userId });

		const io = req.app.get("socketio");
		io.emit("eventUpdate", {
			event: { _id: event._id },
			type: "delete",
		});

		successResponse(res, 200, "Event deleted successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const getEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const eventId = req.params.id;
		if (!eventId || !mongoose.isValidObjectId(eventId)) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const event = await Event.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(eventId) } },
			{
				$lookup: {
					from: "users",
					localField: "organizer",
					foreignField: "_id",
					as: "organizer",

					pipeline: [
						{
							$project: {
								username: 1,
								avatar: 1,
								firstName: 1,
								lastName: 1,
							},
						},
					],
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",

					pipeline: [
						{
							$project: {
								name: 1,
							},
						},
					],
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "atendees",
					foreignField: "_id",
					as: "attendees",
					pipeline: [
						{
							$project: {
								username: 1,
								avatar: 1,
							},
						},
					],
				},
			},
			{
				$addFields: {
					organizer: { $arrayElemAt: ["$organizer", 0] },
					category: { $arrayElemAt: ["$category", 0] },
					attendees: {
						$map: {
							input: "$attendees",
							as: "attendee",
							in: {
								username: "$$attendee.username",
								avatar: "$$attendee.avatar",
							},
						},
					},
					totalAttendees: { $size: "$atendees" },
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					description: 1,
					location: 1,
					image: 1,
					url: 1,
					price: 1,
					isFree: 1,
					startDate: 1,
					endDate: 1,
					category: 1,
					organizer: 1,
					attendees: 1,
					totalAttendees: 1,
				},
			},
		]);
		if (!event) {
			errorResponse(res, 404, "Event not found");
			return;
		}

		const isOrganizer =
			event[0]?.organizer?._id?.toString() === req.user?._id.toString();

		const isAttendee = event[0].attendees.some(
			(attendee: any) => attendee.username === req.user?.username
		);

		successResponse(res, 200, "Event fetched successfully", {
			...event[0],
			isOrganizer,
			isAttendee,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
	try {
		const events = await Event.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "organizer",
					foreignField: "_id",
					as: "organizer",

					pipeline: [
						{
							$project: {
								username: 1,
							},
						},
					],
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",

					pipeline: [
						{
							$project: {
								name: 1,
							},
						},
					],
				},
			},
			{
				$addFields: {
					organizer: { $arrayElemAt: ["$organizer", 0] },
					category: { $arrayElemAt: ["$category", 0] },
					totalAtendees: { $size: "$atendees" },
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					location: 1,
					image: 1,
					price: 1,
					isFree: 1,
					startDate: 1,
					category: 1,
					organizer: 1,
					totalAtendees: 1,
				},
			},
		]);

		successResponse(res, 200, "Events fetched successfully", events);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const joinEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const eventId = req.params.id;
		const userId = req.user?._id;

		if (!eventId || !userId || !mongoose.isValidObjectId(eventId)) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const event = await Event.findById(eventId);
		if (!event) {
			errorResponse(res, 404, "Event not found");
			return;
		}

		const now = new Date();
		if (event.startDate < now) {
			errorResponse(
				res,
				400,
				"Cannot join an event that has already started"
			);
			return;
		}
		if (event.endDate < now) {
			errorResponse(
				res,
				400,
				"Cannot join an event that has already ended"
			);
			return;
		}

		const io = req.app.get("socketio");

		const userObjectId = new mongoose.Types.ObjectId(userId);
		const alreadyJoined = event.atendees.some((attendee: any) =>
			attendee.equals(userObjectId)
		);

		if (alreadyJoined) {
			successResponse(res, 200, "Event already joined");
			return;
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			eventId,
			{ $push: { atendees: userObjectId } },
			{ new: true }
		);

		io.emit("atendeeUpdate", {
			eventId,
			count: updatedEvent?.atendees.length ?? 0,
			type: "join",
		});

		successResponse(res, 200, "Event joined successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const leaveEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const eventId = req.params.id;
		const userId = req.user?._id;

		if (!eventId || !userId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const event = await Event.findById(eventId);
		if (!event) {
			errorResponse(res, 404, "Event not found");
			return;
		}

		const io = req.app.get("socketio");

		const userObjectId = new mongoose.Types.ObjectId(userId);
		const alreadyJoined = event.atendees.some((attendee: any) =>
			attendee.equals(userObjectId)
		);

		if (!alreadyJoined) {
			successResponse(res, 200, "Event already left");
			return;
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			eventId,
			{ $pull: { atendees: userObjectId } },
			{ new: true }
		);

		io.emit("atendeeUpdate", {
			eventId,
			count: updatedEvent?.atendees.length ?? 0,
			type: "leave",
		});

		successResponse(res, 200, "Event already left");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

export {
	createEvent,
	updateEvent,
	deleteEvent,
	getEvent,
	getAllEvents,
	joinEvent,
	leaveEvent,
};
