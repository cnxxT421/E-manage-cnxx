import { IEvent } from "@/types/event";
import Card from "./Card";
import Pagination from "./Pagination";
import { useState, useMemo, useEffect } from "react";
import Search from "./Search";
import SelectCategory from "./Select";
import { AnimatePresence, motion } from "framer-motion";
import {
	exploreContainerVariants,
	exploreItemVariants,
} from "@/constants/animation";

type CollectionProps = {
	data: IEvent[];
	emptyTitle: string;
	emptyStateSubtext: string;
};

const Collection = ({
	data,
	emptyTitle,
	emptyStateSubtext,
}: CollectionProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const resultsPerPage = 6;
	const filteredData = useMemo(() => {
		return data.filter((event) => {
			const matchesCategory = category
				? event.category.name === category
				: true;
			const matchesSearch = searchTerm
				? event.title.toLowerCase().includes(searchTerm.toLowerCase())
				: true;
			return matchesCategory && matchesSearch;
		});
	}, [data, category, searchTerm]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredData.length / resultsPerPage)
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [category, searchTerm]);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * resultsPerPage;
		return filteredData.slice(startIndex, startIndex + resultsPerPage);
	}, [filteredData, currentPage]);

	return (
		<motion.div
			variants={exploreContainerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="flex w-full flex-col gap-5 md:flex-row">
				<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<SelectCategory setCategory={setCategory} />
			</div>

			<AnimatePresence mode="wait">
				{paginatedData.length > 0 ? (
					<motion.div
						key="results"
						className="flex flex-col items-center gap-10 mt-8"
						variants={exploreContainerVariants}
					>
						<motion.ul
							className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10"
							variants={exploreContainerVariants}
						>
							{paginatedData.map((event) => (
								<motion.li
									key={event._id}
									className="flex justify-center"
									variants={exploreItemVariants}
								>
									<Card event={event} />
								</motion.li>
							))}
						</motion.ul>

						{totalPages > 1 && (
							<Pagination
								totalPages={totalPages}
								currentPage={currentPage}
								handlePrevPage={() =>
									setCurrentPage((prev) =>
										Math.max(prev - 1, 1)
									)
								}
								handleNextPage={() =>
									setCurrentPage((prev) =>
										Math.min(prev + 1, totalPages)
									)
								}
								handlePageChange={setCurrentPage}
							/>
						)}
					</motion.div>
				) : (
					<motion.div
						key="empty"
						variants={exploreItemVariants}
						className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] py-28 text-center mt-8"
					>
						<motion.h3
							className="p-bold-20 md:h5-bold"
							variants={exploreItemVariants}
						>
							{emptyTitle}
						</motion.h3>
						<motion.p
							className="p-regular-14"
							variants={exploreItemVariants}
						>
							{emptyStateSubtext}
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Collection;
