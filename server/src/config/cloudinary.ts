import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";
import fs from "fs";

cloudinary.config({
	cloud_name: config.cloudinaryName,
	api_key: config.cloudinaryApiKey,
	api_secret: config.cloudinaryApiSecret,
});

const uploadOnCloudinary = async (localFilePath: string) => {
	if (!localFilePath) return null;

	try {
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
		});

		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		console.log("Error uploading file to Cloudinary: ", error);
		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFilePath);
		}
		return null;
	}
};

const deleteFromCloudinary = async (
	cloudinaryUrl: string
): Promise<boolean> => {
	try {
		const publicId = cloudinaryUrl.split("/").slice(-1)[0].split(".")[0];
		const response = await cloudinary.uploader.destroy(publicId);

		if (response.result === "ok") {
			console.log("Image deleted successfully from Cloudinary.");
			return true;
		} else {
			console.error("Failed to delete image from Cloudinary:", response);
			return false;
		}
	} catch (error) {
		console.error("Error deleting image from Cloudinary:", error);
		return false;
	}
};

export { uploadOnCloudinary, deleteFromCloudinary };
