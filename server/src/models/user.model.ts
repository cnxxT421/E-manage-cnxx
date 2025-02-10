import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
	_id: string;
	username: string;
	fullName: string;
	lastName: string;
	email: string;
	password: string;
	avatar: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
