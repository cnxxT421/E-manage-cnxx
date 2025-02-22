import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	MapPin,
	Heart,
} from "lucide-react";

const Footer = () => {
	const footerLinks = {
		company: [
			{ label: "About Us", href: "/about" },
			{ label: "Our Team", href: "/team" },
			{ label: "Careers", href: "/careers" },
			{ label: "Contact Us", href: "/contact" },
		],
		services: [
			{ label: "Event Planning", href: "/services/planning" },
			{ label: "Venue Booking", href: "/services/venues" },
			{ label: "Virtual Events", href: "/services/virtual" },
			{ label: "Corporate Events", href: "/services/corporate" },
		],
		resources: [
			{ label: "Blog", href: "/blog" },
			{ label: "Guidelines", href: "/guidelines" },
			{ label: "FAQs", href: "/faqs" },
			{ label: "Support", href: "/support" },
		],
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<motion.footer
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={containerVariants}
			className="border-t border-foreground"
		>
			<div className="wrapper py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<motion.div variants={itemVariants} className="space-y-4">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Link
								to="/"
								className="text-2xl font-bold p-2 border-2 rounded-[2px] border-foreground hover:bg-foreground hover:text-background duration-300"
							>
								E-Manage
							</Link>
						</motion.div>
						<p className="mt-4">
							Transform your events into unforgettable experiences
							with our comprehensive event management platform.
						</p>
						<div className="flex space-x-4 mt-6">
							{[Facebook, Twitter, Instagram, Linkedin].map(
								(Icon, index) => (
									<motion.a
										key={index}
										href="#"
										whileHover={{ scale: 1.2, rotate: 5 }}
										whileTap={{ scale: 0.9 }}
										className="hover:text-red-600 transition-colors"
									>
										<Icon size={20} />
									</motion.a>
								)
							)}
						</div>
					</motion.div>

					{Object.entries(footerLinks).map(([title, links]) => (
						<motion.div
							key={title}
							variants={itemVariants}
							className="space-y-4"
						>
							<h3 className="text-lg font-semibold capitalize">
								{title}
							</h3>
							<ul className="space-y-2">
								{links.map((link, linkIndex) => (
									<motion.li
										key={linkIndex}
										whileHover={{ x: 5 }}
										transition={{
											type: "spring",
											stiffness: 300,
										}}
									>
										<Link
											to={link.href}
											className="hover:text-red-600 transition-colors duration-200"
										>
											{link.label}
										</Link>
									</motion.li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				<motion.div
					variants={itemVariants}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 py-8 border-t border-foreground"
				>
					{[
						{ icon: Mail, text: "hello@emanage.com" },
						{ icon: Phone, text: "+1 (555) 123-4567" },
						{
							icon: MapPin,
							text: "123 Event Street, City, Country",
						},
					].map((item, index) => (
						<motion.div
							key={index}
							className="flex items-center justify-center md:justify-start gap-2"
							whileHover={{ scale: 1.02 }}
						>
							<item.icon size={18} />
							<span>{item.text}</span>
						</motion.div>
					))}
				</motion.div>

				{/* Bottom Bar */}
				<motion.div
					variants={itemVariants}
					className="mt-8 pt-8 border-t border-foreground"
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<motion.p
							className="text-center md:text-left"
							whileHover={{ scale: 1.02 }}
						>
							© {new Date().getFullYear()} E-manage. All rights
							reserved.
						</motion.p>
						<motion.div
							className="flex items-center gap-2"
							whileHover={{ scale: 1.02 }}
						>
							<span>Made with</span>
							<motion.div
								animate={{
									scale: [1, 1.2, 1],
									rotate: [0, 10, -10, 0],
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									repeatType: "reverse",
								}}
							>
								<Heart size={18} className="text-red-500" />
							</motion.div>
							<Link to="https://github.com/alok-x0s1">
								by @LokYadav
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</motion.footer>
	);
};

export default Footer;
