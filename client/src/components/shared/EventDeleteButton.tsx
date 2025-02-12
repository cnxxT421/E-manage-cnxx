import { useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import axios from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";
import { useToast } from "@/hooks/use-toast";

const EventDeleteButton = ({ id }: { id: string }) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleDeleteProfile = async () => {
		try {
			setIsDeleting(true);

			const res = await axios.delete(`/events/${id}`);
			if (res.data.success) {
				setDeleteDialogOpen(false);
			}
			navigate("/events");
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data.message ||
				"An error occurred while fetching the profile.";

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
			setIsDeleting(false);
		}
	};

	return (
		<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
			<DialogTrigger asChild>
				<div className="rounded-xl bg-white p-3 shadow-sm transition-all cursor-pointer">
					<img
						src="/delete.svg"
						alt="edit"
						width={20}
						height={20}
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="bg-primary-50">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<p className="text-gray-600">
					Deleting your profile is permanent and cannot be undone.
				</p>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setDeleteDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleDeleteProfile}
						disabled={isDeleting}
					>
						{isDeleting ? "Deleting..." : "Delete Profile"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EventDeleteButton;
