import { exploreItemVariants } from "@/constants/animation";
import { motion } from "framer-motion";

type PaginationProps = {
	totalPages: number;
	currentPage: number;
	handlePrevPage: () => void;
	handleNextPage: () => void;
	handlePageChange: (page: number) => void;
};

const Pagination = ({
	totalPages,
	currentPage,
	handlePrevPage,
	handleNextPage,
	handlePageChange,
}: PaginationProps) => {
	return (
		<motion.div
			className="flex gap-2 items-center justify-center"
			variants={exploreItemVariants}
		>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				className="px-4 py-2 rounded-lg bg-foreground text-background disabled:opacity-50"
			>
				Previous
			</motion.button>
			{Array.from({ length: totalPages }, (_, i) => (
				<motion.button
					key={i + 1}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => handlePageChange(i + 1)}
					className={`w-10 h-10 rounded-full ${
						currentPage === i + 1
							? "bg-foreground text-background"
							: "bg-background border border-foreground"
					}`}
				>
					{i + 1}
				</motion.button>
			))}
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className="px-4 py-2 rounded-lg bg-foreground text-background disabled:opacity-50"
			>
				Next
			</motion.button>
		</motion.div>
	);
};

export default Pagination;
