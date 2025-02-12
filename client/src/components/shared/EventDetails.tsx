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
	}, []);

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
		<>
			<section
				className={`flex relative justify-center bg-primary-50 bg-dotted-pattern bg-contain ${
					loading || error ? "md:py-10" : ""
				}`}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
					{loading ? (
						<Skeleton className="h-full w-96 min-h-[300px]" />
					) : event ? (
						<img
							src={event.image}
							alt={event.title}
							width={1000}
							height={1000}
							className="h-full min-h-[300px] object-cover object-center"
						/>
					) : (
						<div className="h-full min-h-[300px] flex items-center justify-center bg-gray-200">
							<p className="text-gray-500">No image available</p>
						</div>
					)}

					<div className="flex w-full flex-col gap-8 p-5 md:p-10">
						{loading ? (
							<Skeleton className="h-8 w-48" />
						) : event ? (
							<h2 className="h2-bold mt-4">{event.title}</h2>
						) : (
							<h2 className="h2-bold text-red-500">
								Event Not Found
							</h2>
						)}

						{loading ? (
							<Skeleton className="h-5 w-1/3" />
						) : event ? (
							<div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
								<div className="flex gap-3">
									<p className="p-bold-20 rounded-full bg-green-500/10 px-4 py-2 text-green-700">
										{event.isFree
											? "FREE"
											: `$${event.price}`}
									</p>
									<p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
										{event.category.name}
									</p>
								</div>

								<p className="p-medium-18 ml-2 mt-2 sm:mt-0">
									by{" "}
									<span className="text-primary-500">
										{event.organizer.firstName}{" "}
										{event.organizer.lastName}
									</span>
								</p>
							</div>
						) : null}

						<div className="flex flex-col gap-5">
							{loading ? (
								<Skeleton className="h-5 w-1/2" />
							) : event ? (
								<div className="flex gap-2 md:gap-3">
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
											{
												formatDateTime(event.endDate)
													.dateOnly
											}{" "}
											-{" "}
											{
												formatDateTime(event.endDate)
													.timeOnly
											}
										</p>
									</div>
								</div>
							) : null}

							{loading ? (
								<Skeleton className="h-5 w-1/3" />
							) : event ? (
								<div className="p-regular-20 flex items-center gap-3">
									<img
										src="/location.svg"
										alt="location"
										width={32}
										height={32}
									/>
									<p className="p-medium-16 lg:p-regular-20">
										{event.location}
									</p>
								</div>
							) : null}
						</div>

						{loading ? (
							<Skeleton className="h-20 w-full" />
						) : event ? (
							<div className="flex flex-col gap-2">
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
									Total Attendees :
									<span className="ml-1 px-3 py-2 border h-fit w-fit rounded-full bg-blue-100">
										{event.totalAttendees}
									</span>
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
							</div>
						) : null}

						{event?.isOrganizer && (
							<div className="absolute right-4 top-2 flex flex-wrap items-center gap-4">
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
							</div>
						)}

						{error && (
							<Alert variant="destructive">
								<AlertTitle>
									{error ===
									"Access denied, no token provided"
										? "Please login to access this page"
										: "Error"}
								</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
					</div>
				</div>
			</section>

			{/* <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
				<h2 className="h2-bold">Related Events</h2>
			</section> */}
		</>
	);
};

export default EventDetails;
