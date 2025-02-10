const _config = {
	port: process.env.PORT || 3000,
	clientUrl: process.env.CLIENT_URL,
};

export const config = Object.freeze(_config);
