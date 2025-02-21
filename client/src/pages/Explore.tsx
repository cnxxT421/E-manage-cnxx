import Collection from "@/components/shared/Collections";
import { IEvent } from "@/types/event";
import axios from "@/utils/axios";
import socket from "@/utils/socket";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	exploreContainerVariants,
	exploreItemVariants,
} from "@/constants/animation";

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
		<motion.main
			initial="hidden"
			animate="visible"
			variants={exploreContainerVariants}
		>
			<motion.section
				id="events"
				className="wrapper py-28 flex flex-col gap-8"
				variants={exploreItemVariants}
			>
				<motion.h2
					className="h2-bold"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					Discover and Join Amazing Events
				</motion.h2>

				<Collection
					data={events}
					emptyTitle="No Events Available"
					emptyStateSubtext="Check back soon for new events!"
				/>
			</motion.section>
		</motion.main>
	);
};

export default Explore;
