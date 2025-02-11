import { z } from "zod";

export const CategorySchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(20, "Name must be at most 20 characters"),
	description: z.string().optional(),
});
