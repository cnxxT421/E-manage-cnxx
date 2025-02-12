import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
			<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
				<div className="flex flex-col justify-center gap-8">
					<h1 className="h1-bold">
						Create, Share, and Enjoy: Your Ultimate Event Hub!
					</h1>
					<p className="p-regular-20 md:p-regular-24">
						Join a thriving community and discover thousands of
						events tailored to your interests. Connect, learn, and
						have fun!
					</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<Button
							size="lg"
							asChild
							className="button w-full sm:w-fit"
						>
							<Link to="/events">Explore Now</Link>
						</Button>
						<Button
							variant="outline"
							size="lg"
							asChild
							className="button w-full sm:w-fit"
						>
							<Link to="/create-event">Create an Event</Link>
						</Button>
					</div>
				</div>

				<img
					src="/images/home-image.jpg"
					alt="People enjoying an event together"
					width={1000}
					height={1000}
					className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]"
				/>
			</div>
		</section>
	);
};

export default Home;
