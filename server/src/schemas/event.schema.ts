import { z } from "zod";

export const EventSchema = z.object({
	title: z.string().min(3, "Title is required"),
	description: z.string().optional(),
	location: z.string().min(1, "Location is required"),
	url: z.string().url("URL must be valid").optional(),
	price: z.string().refine((val) => !isNaN(Number(val)), {
		message: "Price must be a number",
	}),
	isFree: z.string().refine((val) => val === "true" || val === "false", {
		message: "isFree must be true or false",
	}),
	startDate: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date()
	),
	endDate: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date()
	),
	categoryId: z.string().min(1, "Category ID is required"),
});

export const UpdateEventSchema = z.object({
	title: z.string().min(3, "Title is required").optional(),
	description: z.string().optional(),
	location: z.string().min(1, "Location is required").optional(),
	url: z.string().url("URL must be valid").optional(),
	startDate: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date()
	),
	endDate: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date()
	),
	categoryId: z.string().min(1, "Category ID is required").optional(),
});
