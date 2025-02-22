export const headerLinks = [
	{
		label: "Create Event",
		route: "/create-event",
	},
	{
		label: "Explore",
		route: "/events",
	},
	{
		label: "My Profile",
		route: "/profile",
	},
];

export const eventDefaultValues = {
	title: "",
	description: "",
	location: "",
	image: "",
	startDateTime: new Date(),
	endDateTime: new Date(),
	categoryId: "",
	price: "",
	isFree: false,
	url: "",
};

export const updateEventDefaultValues = {
	title: "",
	description: "",
	location: "",
	startDateTime: new Date(),
	endDateTime: new Date(),
	categoryId: "",
	url: "",
};

export const signupDefaultValues = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	avatar: "",
};

export const signinDefaultValues = {
	username: "",
	password: "",
};

export const categories = [
	{
		_id: "1",
		name: "Technology",
	},
	{
		_id: "2",
		name: "Computer Science",
	},
	{
		_id: "3",
		name: "Finance",
	},
	{
		_id: "4",
		name: "Commerse",
	},
	{
		_id: "5",
		name: "AI",
	},
	{
		_id: "7",
		name: "ML",
	},
];
