import { useCallback, useEffect, useState } from "react";
import { IEvent } from "@/types/event";
import { formatDateTime } from "@/utils/date";
import { AxiosError } from "axios";
import axios from "@/utils/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useParams } from "react-router-dom";
import EventDeleteButton from "./EventDeleteButton";
import AttendEventButton, { LeaveEventButton } from "./EventActionButton";
import socket from "@/utils/socket";
import { motion } from "framer-motion";

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 },
	},
};

const staggerChildren = {
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const EventDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [event, setEvent] = useState<IEvent | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchEvent = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<{ data: IEvent }>(`/events/${id}`);
			setEvent(response.data.data);
		} catch (err) {
			const axiosError = err as AxiosError<{ message: string }>;
			const errorMessage =
				axiosError.response?.data?.message ||
				"Failed to fetch event details.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchEvent();
	}, [fetchEvent]);

	useEffect(() => {
		if (!id) return;

		const handleAttendeeUpdate = (data: {
			eventId: string;
			count: number;
			type: "join" | "leave";
		}) => {
			if (data.eventId === id && event) {
				setEvent((prevEvent) =>
					prevEvent
						? {
								...prevEvent,
								totalAttendees: data.count,
								isAttendee: data.type === "join",
						  }
						: prevEvent
				);
			}
		};

		socket.on("atendeeUpdate", handleAttendeeUpdate);

		return () => {
			socket.off("atendeeUpdate", handleAttendeeUpdate);
		};
	}, [id, event]);

	return (
		<section
			className={`flex relative justify-center bg-dotted-pattern bg-contain pt-[72px] min-h-screen`}
		>
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl"
				initial="hidden"
				animate="visible"
				variants={staggerChildren}
			>
				{loading ? (
					<Skeleton className="h-full w-[450px] min-h-[300px]" />
				) : event ? (
					<motion.img
						variants={fadeIn}
						src={event.image}
						alt={event.title}
						width={1000}
						height={1000}
						className="h-full min-h-[300px] object-cover object-center"
					/>
				) : (
					<motion.div
						variants={fadeIn}
						className="h-full min-h-[300px] bg-foreground flex items-center justify-center"
					>
						<p className="text-background">No image available</p>
					</motion.div>
				)}

				<motion.div
					variants={staggerChildren}
					className="flex w-full flex-col gap-8 p-5 md:p-10"
				>
					{loading ? (
						<Skeleton className="h-8 w-48" />
					) : event ? (
						<motion.h2 variants={fadeIn} className="h2-bold mt-4">
							{event.title}
						</motion.h2>
					) : (
						<motion.h2
							variants={fadeIn}
							className="h2-bold text-red-500"
						>
							Event Not Found
						</motion.h2>
					)}

					{loading ? (
						<Skeleton className="h-5 w-1/3" />
					) : event ? (
						<motion.div
							variants={fadeIn}
							className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center"
						>
							<div className="flex gap-3">
								<motion.p
									variants={fadeIn}
									className="p-bold-20 rounded-full bg-green-500/10 px-4 py-2 text-green-700"
								>
									{event.isFree ? "FREE" : `$${event.price}`}
								</motion.p>
								<motion.p
									variants={fadeIn}
									className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500"
								>
									{event.category.name}
								</motion.p>
							</div>

							<motion.p
								variants={fadeIn}
								className="p-medium-18 ml-2 mt-2 sm:mt-0"
							>
								by{" "}
								<span className="text-primary-500">
									{event.organizer.firstName}{" "}
									{event.organizer.lastName}
								</span>
							</motion.p>
						</motion.div>
					) : null}

					<motion.div
						variants={staggerChildren}
						className="flex flex-col gap-5"
					>
						{loading ? (
							<Skeleton className="h-5 w-1/2" />
						) : event ? (
							<motion.div
								variants={fadeIn}
								className="flex gap-2 md:gap-3"
							>
								<img
									src="/calendar.svg"
									alt="calendar"
									width={32}
									height={32}
								/>
								<div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
									<p>
										From{" "}
										{
											formatDateTime(event.startDate)
												.dateOnly
										}{" "}
										-{" "}
										{
											formatDateTime(event.startDate)
												.timeOnly
										}
									</p>
									<p>
										to{" "}
										{formatDateTime(event.endDate).dateOnly}{" "}
										-{" "}
										{formatDateTime(event.endDate).timeOnly}
									</p>
								</div>
							</motion.div>
						) : null}

						{/* Location section with animation */}
						{loading ? (
							<Skeleton className="h-5 w-1/3" />
						) : event ? (
							<motion.div
								variants={fadeIn}
								className="p-regular-20 flex items-center gap-3"
							>
								<img
									src="/location.svg"
									alt="location"
									width={32}
									height={32}
								/>
								<p className="p-medium-16 lg:p-regular-20">
									{event.location}
								</p>
							</motion.div>
						) : null}
					</motion.div>

					{/* Description and attendance section with animation */}
					{loading ? (
						<Skeleton className="h-20 w-full" />
					) : event ? (
						<motion.div
							variants={fadeIn}
							className="flex flex-col gap-2"
						>
							<p className="p-bold-20 text-grey-600">
								What You'll Learn:
							</p>
							<p className="p-medium-16 lg:p-regular-18">
								{event.description}
							</p>
							<p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
								{event.url}
							</p>

							<p className="p-medium-16 mb-4">
								Total Attendees:
								<motion.span
									className="ml-1 px-3 py-2 border h-fit w-fit rounded-full bg-blue-100"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 10,
									}}
								>
									{event.totalAttendees}
								</motion.span>
							</p>

							{!event.isOrganizer &&
								(event.isAttendee ? (
									<LeaveEventButton
										id={event._id as string}
									/>
								) : (
									<AttendEventButton
										id={event._id as string}
									/>
								))}
						</motion.div>
					) : null}

					{/* Organizer controls with animation */}
					{event?.isOrganizer && (
						<motion.div
							className="absolute right-4 top-2 flex flex-wrap items-center gap-4"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Link
								to={`/events/${event?._id}/update`}
								className="rounded-xl bg-white p-3 shadow-sm transition-all"
							>
								<img
									src="/edit.svg"
									alt="edit"
									width={20}
									height={20}
								/>
							</Link>
							<EventDeleteButton id={event?._id as string} />
						</motion.div>
					)}

					{error && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Alert variant="destructive">
								<AlertTitle>
									{error ===
									"Access denied, no token provided"
										? "Please login to access this page"
										: "Error"}
								</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						</motion.div>
					)}
				</motion.div>
			</motion.div>
		</section>
	);
};

export default EventDetails;
