import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface IUser extends Document {
	_id: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	avatar: string;
	createdAt: Date;
	updatedAt: Date;

	comparePassword(password: string): Promise<boolean>;
	generateToken(): string;
}

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
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
			select: false,
		},
		avatar: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	const hashedPassword = await bcrypt.hash(this.password, 10);
	this.password = hashedPassword;

	next();
});

UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function (): string {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
		},
		config.jwtSecret,
		{
			expiresIn: "7d",
		}
	);
	return token;
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
