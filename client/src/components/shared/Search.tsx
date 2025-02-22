import { exploreItemVariants } from "@/constants/animation";
import { Input } from "../ui/input";
import { motion } from "framer-motion";

interface SearchProp {
	placeholder?: string;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

const Search = ({
	placeholder = "Search Events...",
	searchTerm,
	setSearchTerm,
}: SearchProp) => {
	return (
		<motion.div
			variants={exploreItemVariants}
			className="flex-center min-h-[54px] w-full overflow-hidden rounded-full border border-foreground px-4 py-2"
		>
			<img src="/search.svg" alt="search" width={24} height={24} />

			<Input
				type="text"
				placeholder={placeholder}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="p-regular-16 border-0 outline-offset-0 placeholder:text-grey-600 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
			/>
		</motion.div>
	);
};

export default Search;
