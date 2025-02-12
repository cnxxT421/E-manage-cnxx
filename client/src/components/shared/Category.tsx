import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/data";

const CategoryFilter = ({
	onSelectCategory,
}: {
	onSelectCategory: (value: string) => void;
}) => {
	return (
		<Select onValueChange={(value: string) => onSelectCategory(value)}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="All" className="select-item p-regular-14">
					All
				</SelectItem>

				{categories.map((category) => (
					<SelectItem
						value={category.name}
						key={category._id}
						className="select-item p-regular-14"
					>
						{category.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default CategoryFilter;
