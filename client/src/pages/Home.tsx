import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import Features from "@/components/shared/Features";
import CTA from "@/components/shared/CTA";

const HomePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="relative overflow-hidden"
			>
				<div className="wrapper py-20">
					<div className="flex flex-col lg:flex-row items-center gap-12">
						<motion.div
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="flex-1 text-center lg:text-left"
						>
							<motion.h1
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.8 }}
								className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
							>
								Transform Your Events Management
							</motion.h1>
							<motion.p
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4, duration: 0.8 }}
								className="text-xl text-gray-600 mb-8"
							>
								Streamline your event planning process with our
								all-in-one platform. Create, manage, and execute
								exceptional events with ease.
							</motion.p>
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.6, duration: 0.8 }}
								className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
							>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button>
										<Link to="/sign-up">Get Started</Link>
									</Button>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										variant="outline"
										className="px-8 py-6 text-lg rounded-full"
									>
										<Link to="/events">Watch Demo</Link>
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>
						<motion.div
							className="flex-1"
							initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.8 }}
						>
							<motion.div
								animate={{
									y: [0, -20, 0],
									rotate: [0, 5, -5, 0],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									repeatType: "reverse",
								}}
								className="relative"
							>
								<div className="w-64 h-64 mx-auto bg-blue-600 rounded-full opacity-20 blur-xl" />
								<Calendar className="w-64 h-64 text-blue-600 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2" />
							</motion.div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			<Features />
			<CTA />
		</div>
	);
};

export default HomePage;
