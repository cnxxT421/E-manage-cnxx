const _config = {
	port: process.env.PORT || 3000,
	clientUrl: process.env.CLIENT_URL,
	mongodbUrl: process.env.MONGODB_URI as string,
	nodeEnv: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_TOKEN_SECRET as string,
	cloudinaryName: process.env.CLOUDINARY_NAME as string,
	cloudinaryApiKey: process.env.CLOUDINARY_API_KEY as string,
	cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET as string,
};

export const config = Object.freeze(_config);
