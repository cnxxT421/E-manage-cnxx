import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNav = () => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Menu className="w-6 h-6 text-gray-700" />
					</motion.div>
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-6 md:hidden">
					<SheetTitle className="hidden">
						Mobile Navigation
					</SheetTitle>
					<SheetDescription className="hidden">
						This contains the mobile navigation
					</SheetDescription>
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
					<Separator className="border border-foreground" />
					<NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default MobileNav;
