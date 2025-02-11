import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { EventSchema, UpdateEventSchema } from "../schemas/event.schema";
import { deleteFromCloudinary, uploadOnCloudinary } from "../config/cloudinary";
import Event from "../models/event.model";
import { validateDate } from "../utils/date";

const createEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?._id;
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
			category,
		} = validData.data;

		const dateValidation = validateDate(startDate, endDate);
		if (!dateValidation.valid) {
			errorResponse(res, 400, dateValidation.message!);
			return;
		}

		const existingCategory = await Event.findOne({ category });
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
			isFree,
			startDate,
			endDate,
			organizer: userId,
			category: existingCategory._id,
		});

		successResponse(res, 201, "Event created successfully", {
			event: event._id,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
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
			category,
		} = validData.data;

		const dateValidation = validateDate(startDate, endDate);
		if (!dateValidation.valid) {
			errorResponse(res, 400, dateValidation.message!);
			return;
		}

		const existingCategory = await Event.findOne({ category });
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
		);

		successResponse(res, 200, "Event updated successfully", {
			event: updatedEvent,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
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

		successResponse(res, 200, "Event deleted successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getEvent = async (req: Request, res: Response): Promise<void> => {
	try {
		const eventId = req.params.id;
		const event = await Event.aggregate([
			{ $match: { _id: eventId } },
			{
				$lookup: {
					from: "users",
					localField: "organizer",
					foreignField: "_id",
					as: "organizer",

					pipeline: [
						{
							$project: {
								name: 1,
								image: 1,
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
				},
			},
		]);
		if (!event) {
			errorResponse(res, 404, "Event not found");
			return;
		}

		successResponse(res, 200, "Event fetched successfully", event);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
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
								name: 1,
								image: 1,
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
		]);

		successResponse(res, 200, "Events fetched successfully", events);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export { createEvent, updateEvent, deleteEvent, getEvent, getAllEvents };
