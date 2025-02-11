import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
	CreateEvent,
	EventDetailsPage,
	Explore,
	Home,
	Profile,
	SigninPage,
	SignupPage,
} from "@/pages";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";

function App() {
	return (
		<Router>
			<div>
				<Toaster />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-up" element={<SignupPage />} />
					<Route path="/sign-in" element={<SigninPage />} />
					<Route path="/events" element={<Explore />} />
					<Route path="/events/:id" element={<EventDetailsPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/create-event" element={<CreateEvent />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
