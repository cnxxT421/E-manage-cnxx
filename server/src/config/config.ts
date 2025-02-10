const _config = {
	port: process.env.PORT || 3000,
	clientUrl: process.env.CLIENT_URL,
	mongodbUrl: process.env.MONGODB_URI as string,
	nodeEnv: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_TOKEN_SECRET,
	jwtExpiry: process.env.JWT_TOKEN_EXPIRY,
};

export const config = Object.freeze(_config);
