import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ICategory } from "@/types/category";
import axios from "@/utils/axios";

type DropdownProps = {
	value?: string;
	onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
	const [categories, setCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		const getCategories = async () => {
			const categoryList = await axios.get("/category");
			categoryList && setCategories(categoryList.data.data);
		};

		getCategories();
	}, []);

	return (
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				{categories &&
				categories.length > 0 &&
					categories.map((category) => (
						<SelectItem
							key={category._id}
							value={category._id}
							className="select-item p-regular-14"
						>
							{category.name}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default Dropdown;
