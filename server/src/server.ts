import "dotenv/config";
import { server } from "./app";
import { config } from "./config/config";
import connectDB from "./db/db";

const PORT = config.port;

connectDB();

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
