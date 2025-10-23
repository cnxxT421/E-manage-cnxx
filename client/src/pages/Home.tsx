import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Features from "@/components/shared/Features";
import CTA from "@/components/shared/CTA";

const HomePage = () => {
	return (
		<div className="flex flex-col pt-20">
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="relative overflow-hidden md:text-center"
			>
				<div className="wrapper py-20 flex flex-col items-center">
					<motion.div
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="max-w-5xl"
					>
						<motion.h1
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.8 }}
							className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 w-full"
						>
							Simplify your event planning
						</motion.h1>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="text-lg text-gray-700 mb-6"
						>
							From corporate conferences to private celebrations,
							our platform makes event management effortless.
							Plan, collaborate, and execute seamless events with
							our powerful tools.
						</motion.p>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.8 }}
							className="text-lg text-gray-600 mb-8"
						>
							No more last-minute stress! Stay organized and
							manage everything in one place.
						</motion.p>

						<p className="text-lg text-gray-700">
							<Link
								to="/events"
								className="explore relative cursor-pointer transition-all duration-300 hover:text-red-500 pr-2"
							>
								Discover Our Events &rarr;
							</Link>
						</p>
					</motion.div>
				</div>
			</motion.section>

			<Features />
			<CTA />
		</div>
	);
};

export default HomePage;
