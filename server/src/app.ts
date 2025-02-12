import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config";
import http from "http";
import { Server } from "socket.io";

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: [`${config.clientUrl}`],
		credentials: true,
		methods: ["GET", "POST"],
	},
});
app.set("socketio", io);

app.use(
	cors({
		origin: [`${config.clientUrl}`],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.route";
import eventRouter from "./routes/event.route";
import categoryRouter from "./routes/category.route";

// Assign routes
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
	res.send("Hello from e-manage server");
});

export { server };
