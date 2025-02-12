import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/data";

interface SelectCategoryProps {
	setCategory: (value: string) => void;
}

const SelectCategory = ({ setCategory }: SelectCategoryProps) => {
	return (
		<Select onValueChange={(value: string) => setCategory(value)}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				{categories &&
					categories.length > 0 &&
					categories.map((category) => (
						<SelectItem
							key={category._id}
							value={category.name}
							className="select-item p-regular-14"
						>
							{category.name}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default SelectCategory;
