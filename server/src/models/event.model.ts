import mongoose, { Document, Schema } from "mongoose";

interface IEvent extends Document {
	_id: string;
	title: string;
	description?: string;
	location: string;
	image: string;
	url?: string;
	price?: number;
	isFree?: boolean;
	startDate: Date;
	endDate: Date;
	organizer: Schema.Types.ObjectId;
	category: Schema.Types.ObjectId;
	atendees: Schema.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		location: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		url: {
			type: String,
		},
		price: {
			type: String,
		},
		isFree: {
			type: Boolean,
			default: false,
		},
		startDate: {
			type: Date,
			default: Date.now,
		},
		endDate: {
			type: Date,
			default: Date.now,
		},
		organizer: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		atendees: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
