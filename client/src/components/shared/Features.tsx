import {
	Calendar,
	Users,
	Clock,
	Ticket,
	ChartBar,
	ChartAreaIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const Features = () => {
	const [isHovered, setIsHovered] = useState<number | null>(null);

	const features = [
		{
			icon: <Calendar className="w-6 h-6" />,
			title: "Smart Scheduling",
			description:
				"Intelligent calendar management with conflict resolution for seamless event planning",
		},
		{
			icon: <Users className="w-6 h-6" />,
			title: "Team Collaboration",
			description:
				"Real-time coordination with your entire event team for flawless execution",
		},
		{
			icon: <ChartAreaIcon className="w-6 h-6" />,
			title: "Instant Communication",
			description:
				"Chat with team members, vendors, and clients in real-time for quick decisions",
		},
		{
			icon: <ChartBar className="w-6 h-6" />,
			title: "Analytics & Reporting",
			description:
				"Track event performance and generate reports to analyze attendee engagement",
		},
		{
			icon: <Ticket className="w-6 h-6" />,
			title: "Ticketing & Registration",
			description:
				"Manage event ticketing, attendee registration, and check-ins with ease",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "Real-Time Updates",
			description:
				"Send instant updates to attendees and vendors about schedule changes or announcements",
		},
	];

	return (
		<motion.section
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			className="py-20 bg-gradient-to-l from-sky-50 to-white"
		>
			<div className="max-w-6xl mx-auto px-4">
				<motion.h2
					variants={itemVariants}
					className="text-3xl font-bold text-center mb-16"
				>
					Why Choose E-manage?
				</motion.h2>
				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.2 },
							}}
							onHoverStart={() => setIsHovered(index)}
							onHoverEnd={() => setIsHovered(null)}
						>
							<Card className="h-full">
								<CardContent className="p-6">
									<motion.div
										animate={
											isHovered === index
												? {
														rotate: [0, 15, -15, 0],
														transition: {
															duration: 0.5,
														},
												  }
												: {}
										}
										className="rounded-full bg-blue-100 p-3 w-fit mb-4"
									>
										{feature.icon}
									</motion.div>
									<h3 className="text-xl font-semibold mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-600">
										{feature.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default Features;
