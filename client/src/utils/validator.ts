import z from "zod";

export const eventFormSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z
		.string()
		.min(3, "Description must be at least 3 characters")
		.max(400, "Description must be less than 400 characters"),
	location: z
		.string()
		.min(3, "Location must be at least 3 characters")
		.max(400, "Location must be less than 400 characters"),
	image: z.string(),
	startDate: z.date(),
	endDate: z.date(),
	categoryId: z.string(),
	price: z.string(),
	isFree: z.boolean(),
	url: z.string().url("URL must be valid"),
});

export const signupSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters"),
	firstName: z.string().min(1, "Full name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	avatar: z.string(),
});

export const signinSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
