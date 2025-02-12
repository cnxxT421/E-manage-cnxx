import { useCallback, useEffect, useState } from "react";
import { ErrorResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";
import axios from "@/utils/axios";
import { IUser } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const [profile, setProfile] = useState<IUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const navigate = useNavigate();

	const fetchProfile = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<{ data: IUser }>("/users/profile");
			setProfile(response.data.data);
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data.message ||
				"An error occurred while fetching the profile.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	const handleLogout = async () => {
		try {
			await axios.get("/users/logout");
			navigate("/sign-in");
		} catch (err) {
			setError("An error occurred while logging out.");
		}
	};

	const handleDeleteProfile = async () => {
		setIsDeleting(true);
		try {
			await axios.delete("/users/profile");
			navigate("/");
		} catch (err) {
			setError("An error occurred while deleting the profile.");
		} finally {
			setIsDeleting(false);
			setDeleteDialogOpen(false);
		}
	};

	return (
		<main>
			<section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
				<h3 className="wrapper h3-bold text-center sm:text-left">
					Your Profile
				</h3>
			</section>

			<div className="wrapper my-8">
				<Card className="w-full max-w-md mx-auto shadow-lg p-4">
					<CardHeader className="flex items-center space-x-4">
						{loading ? (
							<Skeleton className="w-16 h-16 rounded-full" />
						) : (
							<Avatar className="w-16 h-16">
								{profile?.avatar ? (
									<AvatarImage
										src={profile.avatar}
										alt={profile.username}
									/>
								) : (
									<AvatarFallback className="text-2xl">
										{profile?.firstName?.charAt(0) || "?"}
									</AvatarFallback>
								)}
							</Avatar>
						)}

						<div>
							{loading ? (
								<>
									<Skeleton className="h-6 w-40 mb-2" />
									<Skeleton className="h-4 w-32" />
								</>
							) : (
								<>
									<CardTitle className="text-xl font-bold">
										{profile?.firstName} {profile?.lastName}
									</CardTitle>
									<p className="text-gray-500">
										@{profile?.username}
									</p>
								</>
							)}
						</div>
					</CardHeader>

					<CardContent>
						{loading ? (
							<>
								<Skeleton className="h-4 w-full mb-2" />
								<Skeleton className="h-4 w-2/3" />
							</>
						) : error ? (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						) : (
							<>
								<p className="text-sm text-gray-700">
									<strong>Email:</strong> {profile?.email}
								</p>
								<p className="text-sm text-gray-700">
									<strong>Joined:</strong>{" "}
									{new Date(
										profile?.createdAt || ""
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>

								<div className="mt-4 flex space-x-4">
									<Button
										variant="outline"
										onClick={handleLogout}
									>
										Logout
									</Button>
									<Button
										variant="destructive"
										onClick={() =>
											setDeleteDialogOpen(true)
										}
									>
										Delete Profile
									</Button>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>

			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
		</main>
	);
};

export default Profile;
