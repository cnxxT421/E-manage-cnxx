import { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "../schemas/user.schema";
import { errorResponse, successResponse } from "../utils/response";
import User from "../models/user.model";
import { deleteFromCloudinary, uploadOnCloudinary } from "../config/cloudinary";
import { cookieOptions } from "../utils/cookie";

const signupUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = SignupSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				"Invalid data format",
				validData.error.format()
			);
			return;
		}

		const { username, firstName, lastName, email, password } =
			validData.data;
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (existingUser) {
			errorResponse(res, 400, "User already exists");
			return;
		}

		const avatarLocalPath = req.file?.path;
		if (!avatarLocalPath) {
			errorResponse(res, 400, "Avatar is required");
			return;
		}
		const avatarCloudinaryUrl = await uploadOnCloudinary(avatarLocalPath);
		if (!avatarCloudinaryUrl) {
			errorResponse(res, 400, "Avatar upload failed");
			return;
		}

		const user = await User.create({
			username,
			firstName,
			lastName,
			email,
			password,
			avatar: avatarCloudinaryUrl?.secure_url,
		});
		const token = user.generateToken();

		res.cookie("token", token, cookieOptions);
		successResponse(res, 201, "User created successfully", {
			userId: user._id,
			token,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const signinUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = SigninSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				"Invalid data format",
				validData.error.format()
			);
			return;
		}

		const { email, password } = validData.data;

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			errorResponse(res, 400, "User not found");
			return;
		}

		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			errorResponse(res, 400, "Invalid credentials");
			return;
		}

		const token = user.generateToken();

		res.cookie("token", token, cookieOptions);
		successResponse(res, 200, "User signed in successfully", {
			userId: user._id,
			token,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie("token");
		successResponse(res, 200, "User signed out successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const user = await User.findById(userId);
		if (!user) {
			errorResponse(res, 404, "User not found");
			return;
		}

		successResponse(res, 200, "User fetched successfully", user);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const user = await User.findByIdAndDelete(userId);
		if (!user) {
			errorResponse(res, 404, "User not found");
			return;
		}

		const avatarCloudinaryUrl = user.avatar;
		if (avatarCloudinaryUrl) {
			await deleteFromCloudinary(avatarCloudinaryUrl);
		}

		successResponse(res, 200, "User deleted successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export { signupUser, signinUser, logoutUser, getProfile, deleteUser };
