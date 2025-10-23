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
	price: z.string().refine(
		(val) => {
			const num = Number(val);
			return !isNaN(num) && num >= 0;
		},
		{
			message: "Price must be a non-negative number",
		}
	),
	isFree: z.boolean(),
	url: z.string().url("URL must be valid"),
});

export const updateEventSchema = z.object({
	title: z.string().min(3, "Title is required").optional(),
	description: z.string().optional(),
	location: z.string().min(1, "Location is required").optional(),
	url: z.string().url("URL must be valid").optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	categoryId: z.string().optional(),
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
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
