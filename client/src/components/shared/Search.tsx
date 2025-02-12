import { Input } from "../ui/input";

interface SearchProp {
	placeholder?: string;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

const Search = ({
	placeholder = "Search title...",
	searchTerm,
	setSearchTerm,
}: SearchProp) => {
	return (
		<div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
			<img
				src="/src/assets/search.svg"
				alt="search"
				width={24}
				height={24}
			/>
			<Input
				type="text"
				placeholder={placeholder}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
			/>
		</div>
	);
};

export default Search;
