import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { CategorySchema } from "../schemas/category.schema";
import Category from "../models/category.model";

const addCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = CategorySchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				"Invalid data format",
				validData.error.format()
			);
			return;
		}

		const { name, description } = validData.data;

		const existingCategory = await Category.findOne({ name });
		if (existingCategory) {
			errorResponse(res, 400, "Category already exists");
			return;
		}

		const category = await Category.create({ name, description });

		successResponse(res, 201, "Category created successfully", {
			category: category._id,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
	try {
		const categories = await Category.find({}).sort({ createdAt: -1 });
		successResponse(
			res,
			200,
			"Categories fetched successfully",
			categories
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		const categoryId = req.params.id;

		if (!categoryId) {
			errorResponse(res, 400, "Invalid request parameters");
			return;
		}

		const category = await Category.findByIdAndDelete(categoryId);
		if (!category) {
			errorResponse(res, 404, "Category not found");
			return;
		}

		successResponse(res, 200, "Category deleted successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Internal server error", error);
	}
};

export { addCategory, getCategories, deleteCategory };
