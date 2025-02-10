import mongoose from "mongoose";
import { config } from "../config/config";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(config.mongodbUrl);
		console.log(
			"Successfully connected to MongoDB => ",
			connection.connection.host
		);
	} catch (error) {
		console.log("MongoDB connection error.");
		process.exit(1);
	}
};

export default connectDB;
