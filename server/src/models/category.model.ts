import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
	_id: string;
	name: string;
	description?: string;
}

const CategorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
