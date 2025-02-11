import { ICategory } from "./category";

export interface IEvent {
	_id: string;
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	location: string;
	image: string;
	price: string;
	isFree: boolean;
	url: string;
	organizer: IOrganizer;
	category: ICategory;
	totalAttendees: number;
	attendees: IAttendee[];
}

export interface IOrganizer {
	_id: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	avatar: string;
}

export interface IAttendee {
	_id: string;
	username: string;
	avatar: string;
}
