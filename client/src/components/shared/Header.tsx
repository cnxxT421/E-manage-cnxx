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
			className="w-full border-b border-foreground backdrop-blur-lg fixed top-0 z-50"
		>
			<div className="wrapper flex items-center justify-between p-4 max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Link
						to="/"
						className="text-2xl font-bold p-2 border-2 rounded-[2px] border-foreground hover:bg-foreground hover:text-background duration-300"
					>
						EM
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
					<motion.div whileTap={{ scale: 0.95 }}>
						<Button asChild className="rounded-[2px] text-md">
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
