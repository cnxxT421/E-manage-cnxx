import { Button } from "../ui/button";

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
		<div className="flex items-center justify-center gap-2 mt-6">
			<Button onClick={handlePrevPage} disabled={currentPage === 1}>
				Prev
			</Button>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index}
					onClick={() => handlePageChange(index + 1)}
					className={`px-4 py-2 rounded-md transition-colors ${
						currentPage === index + 1
							? "bg-red-500 text-white"
							: "bg-gray-200"
					}`}
				>
					{index + 1}
				</button>
			))}
			<Button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
