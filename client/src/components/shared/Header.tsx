import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Header = () => {
	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 100, damping: 20 }}
			className="w-full border-b bg-white/80 backdrop-blur-sm fixed top-0 z-50"
		>
			<div className="wrapper flex items-center justify-between p-4 max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Link to="/" className="w-36">
						<motion.img
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
							src="/logo.png"
							alt="logo"
							width={80}
							className="object-contain"
						/>
					</Link>
				</motion.div>

				<nav className="hidden md:flex-between w-full max-w-xs">
					<NavItems />
				</nav>

				<motion.div
					className="flex w-36 justify-end items-center gap-3"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Button asChild className="rounded-full" size="lg">
							<Link to="/sign-in">Sign in</Link>
						</Button>
					</motion.div>
					<MobileNav />
				</motion.div>
			</div>
		</motion.header>
	);
};

export default Header;
