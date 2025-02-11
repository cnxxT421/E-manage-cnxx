export const headerLinks = [
	{
		label: "Home",
		route: "/",
	},
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

export const signupDefaultValues = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	avatar: "",
};

export const signinDefaultValues = {
	email: "",
	password: "",
};