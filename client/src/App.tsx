import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
	CreateEvent,
	EventDetailsPage,
	Explore,
	Home,
	Profile,
	SigninPage,
	SignupPage,
	UpdateEventPage,
} from "@/pages";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import RootLayout from "./components/Layout";

function App() {
	return (
		<Router>
			<RootLayout>
				<Toaster />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-up" element={<SignupPage />} />
					<Route path="/sign-in" element={<SigninPage />} />
					<Route path="/events" element={<Explore />} />
					<Route path="/events/:id" element={<EventDetailsPage />} />
					<Route
						path="/events/:id/update"
						element={<UpdateEventPage />}
					/>
					<Route path="/profile" element={<Profile />} />
					<Route path="/create-event" element={<CreateEvent />} />
				</Routes>
			</RootLayout>
		</Router>
	);
}

export default App;
