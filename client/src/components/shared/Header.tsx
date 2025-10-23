import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import NavItems from "./NavItems";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

const Header = () => {
	const { userData, logout, isLoading } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

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
					{!isLoading && (
						<>
							{userData ? (
								<>
									<div className="hidden md:flex items-center gap-2">
										<span className="text-sm font-medium whitespace-nowrap">
											Hello,{" "}
											{userData.firstName +
												" " +
												userData.lastName || "User"}
										</span>
									</div>
									<motion.div whileTap={{ scale: 0.95 }}>
										<Button
											variant="destructive"
											onClick={handleLogout}
										>
											Sign out
										</Button>
									</motion.div>
								</>
							) : (
								<motion.div whileTap={{ scale: 0.95 }}>
									<Button
										asChild
										className="rounded-[2px] text-md"
									>
										<Link to="/sign-in">Sign in</Link>
									</Button>
								</motion.div>
							)}
							<MobileNav />
						</>
					)}
					{isLoading && (
						<div className="w-36 flex justify-end">
							<Loader2 className="h-5 w-5 animate-spin" />
						</div>
					)}
				</motion.div>
			</div>
		</motion.header>
	);
};

export default Header;
