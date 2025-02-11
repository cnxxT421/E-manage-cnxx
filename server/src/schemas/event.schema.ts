import { z } from "zod";

export const EventSchema = z.object({
	title: z.string().min(3, "Title is required"),
	description: z.string().optional(),
	location: z.string().min(1, "Location is required"),
	url: z.string().url("URL must be valid").optional(),
	price: z.number().nonnegative("Price cannot be negative").optional(),
	isFree: z.boolean().default(false),
	startDate: z.date(),
	endDate: z.date(),
	category: z.string().min(1, "Category ID is required"),
});

export const UpdateEventSchema = z.object({
	title: z.string().min(3, "Title is required").optional(),
	description: z.string().optional(),
	location: z.string().min(1, "Location is required").optional(),
	url: z.string().url("URL must be valid").optional(),
	startDate: z.date().optional(),
	endDate: z.date().optional(),
	category: z.string().min(1, "Category ID is required").optional(),
});
