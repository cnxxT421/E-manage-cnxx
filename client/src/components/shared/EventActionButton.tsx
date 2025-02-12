import { useState } from "react";
import { Button } from "../ui/button";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";
import { useToast } from "@/hooks/use-toast";

const AttendEventButton = ({ id }: { id: string }) => {
	const [isAttending, setIsAttending] = useState(false);
	const { toast } = useToast();

	const handleAttendEvent = async () => {
		setIsAttending(true);
		try {
			await axios.patch(`/events/join/${id}`);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data.message ||
				"An error occurred while attending the event.";
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
		setIsAttending(false);
	};

	return (
		<Button
			onClick={handleAttendEvent}
			className="w-fit button"
			disabled={isAttending}
		>
			{isAttending ? "Attending" : "Join Event"}
		</Button>
	);
};

export default AttendEventButton;

export const LeaveEventButton = ({ id }: { id: string }) => {
	const [isLeaving, setIsLeaving] = useState(false);
	const { toast } = useToast();

	const handleLeaveEvent = async () => {
		setIsLeaving(true);
		try {
			await axios.patch(`/events/leave/${id}`);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data.message ||
				"An error occurred while leaving the event.";
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
		setIsLeaving(false);
	};

	return (
		<Button
			onClick={handleLeaveEvent}
			className="w-fit button"
			disabled={isLeaving}
			variant={"destructive"}
		>
			{isLeaving ? "Leaving" : "Leave Event"}
		</Button>
	);
};
