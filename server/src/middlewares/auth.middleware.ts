import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface JwtPayload {
	_id: string;
	username: string;
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token =
			req.cookies.token ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			errorResponse(res, 401, "Access denied, no token provided");
			return;
		}

		const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
		const user = await User.findById(decoded._id);

		if (!user) {
			errorResponse(res, 401, "Invalid access token, Please login again");
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export default isLoggedIn;
