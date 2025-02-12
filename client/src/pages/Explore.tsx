import Collection from "@/components/shared/Collections";
import { IEvent } from "@/types/event";
import axios from "@/utils/axios";
import socket from "@/utils/socket";
import { useEffect, useState } from "react";

const Explore = () => {
	const [events, setEvents] = useState<IEvent[]>([]);

	const fetchEvents = async () => {
		try {
			const res = await axios.get(`/events`);
			setEvents(res.data.data);
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};

	useEffect(() => {
		fetchEvents();

		const handleEvent = (data: {
			event: IEvent;
			type: "create" | "update" | "delete";
		}) => {
			setEvents((prevEvents) => {
				if (data.type === "create") {
					return [...prevEvents, data.event];
				} else if (data.type === "update") {
					return prevEvents.map((event) =>
						event._id === data.event._id ? data.event : event
					);
				} else if (data.type === "delete") {
					return prevEvents.filter(
						(event) => event._id !== data.event._id
					);
				}
				return prevEvents;
			});
		};

		socket.on("eventUpdate", handleEvent);

		return () => {
			socket.off("eventUpdate", handleEvent);
		};
	}, []);

	return (
		<main>
			<section
				id="events"
				className="wrapper my-8 flex flex-col gap-8"
			>
				<h2 className="h2-bold">Discover and Join Amazing Events</h2>

				<Collection
					data={events}
					emptyTitle="No Events Available"
					emptyStateSubtext="Check back soon for new events!"
				/>
			</section>
		</main>
	);
};

export default Explore;
