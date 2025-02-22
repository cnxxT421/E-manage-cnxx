import { headerLinks } from "@/constants/data";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, navItemVariants } from "@/constants/animation";

const NavItems = () => {
	return (
		<motion.ul
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="md:flex-between flex w-full flex-col items-start gap-8 md:flex-row"
		>
			{headerLinks.map((link) => (
				<motion.li
					key={link.route}
					variants={navItemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<NavLink
						to={link.route}
						className={({ isActive }) =>
							`${
								isActive ? "text-red-500" : ""
							} flex-center p-semibold-16 whitespace-nowrap hover:text-red-500 transition-colors duration-200`
						}
					>
						{link.label}
					</NavLink>
				</motion.li>
			))}
		</motion.ul>
	);
};

export default NavItems;
