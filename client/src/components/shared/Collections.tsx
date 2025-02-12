import { IEvent } from "@/types/event";
import Card from "./Card";
import Pagination from "./Pagination";
import { useState, useMemo, useEffect } from "react";
import Search from "./Search";
import SelectCategory from "./Select";

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

	const handlePageChange = (page: number) => setCurrentPage(page);
	const handleNextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const handlePrevPage = () =>
		setCurrentPage((prev) => Math.max(prev - 1, 1));

	return (
		<>
			<div className="flex w-full flex-col gap-5 md:flex-row">
				<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<SelectCategory setCategory={setCategory} />
			</div>
			{paginatedData.length > 0 ? (
				<div className="flex flex-col items-center gap-10">
					<ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
						{paginatedData.map((event) => (
							<li key={event._id} className="flex justify-center">
								<Card event={event} />
							</li>
						))}
					</ul>

					{totalPages > 1 && (
						<Pagination
							totalPages={totalPages}
							currentPage={currentPage}
							handlePrevPage={handlePrevPage}
							handleNextPage={handleNextPage}
							handlePageChange={handlePageChange}
						/>
					)}
				</div>
			) : (
				<div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
					<h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
					<p className="p-regular-14">{emptyStateSubtext}</p>
				</div>
			)}
		</>
	);
};

export default Collection;
