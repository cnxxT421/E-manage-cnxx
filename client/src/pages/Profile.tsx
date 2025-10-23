import { useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { headerVariants, itemVariants } from "@/constants/animation";
import { useAuth } from "@/context/AuthProvider";

const Profile = () => {
	const { getProfile, userData, isLoading } = useAuth();

	const [profile, setProfile] = useState<IUser | null>();
	const [error, setError] = useState<string | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const navigate = useNavigate();

	// const fetchProfile = useCallback(async () => {
	// 	setLoading(true);
	// 	setError(null);

	// 	try {
	// 		const response = await axios.get<{ data: IUser }>("/users/profile");
	// 		setProfile(response.data.data);
	// 	} catch (err) {
	// 		const axiosError = err as AxiosError<ErrorResponse>;
	// 		const errorMessage =
	// 			axiosError.response?.data.message ||
	// 			"An error occurred while fetching the profile.";
	// 		setError(errorMessage);
	// 		navigate("/sign-in");
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, [navigate]);

	useEffect(() => {
		if (userData) {
			setProfile(userData);
		}

		getProfile();
	}, [getProfile, userData]);

	const handleLogout = async () => {
		try {
			await axios.get("/users/logout");
			navigate("/sign-in");
		} catch (err) {
			setError((err as string) || "An error occurred while logging out.");
		}
	};

	const handleDeleteProfile = async () => {
		setIsDeleting(true);
		try {
			await axios.delete("/users/profile");
			navigate("/");
		} catch (err) {
			setError(
				(err as string) ||
					"An error occurred while deleting the profile."
			);
		} finally {
			setIsDeleting(false);
			setDeleteDialogOpen(false);
		}
	};

	return (
		<motion.section
			initial="hidden"
			animate="visible"
			variants={headerVariants}
			className="py-20"
		>
			<motion.section
				variants={itemVariants}
				className="wrapper bg-dotted-pattern bg-cover bg-center py-8"
			>
				<motion.h3
					className="wrapper h3-bold text-center sm:text-left"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					Your Profile
				</motion.h3>
			</motion.section>

			<motion.div className="my-8 wrapper" variants={itemVariants}>
				<motion.div
					className="w-full max-w-md mx-auto"
					whileHover={{ scale: 1.02 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Card className="shadow-lg p-4 bg-background text-foreground border-gray-600">
						<CardHeader className="flex items-center space-x-4">
							<AnimatePresence mode="wait">
								{isLoading ? (
									<motion.div
										key="skeleton"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
									>
										<Skeleton className="w-16 h-16 rounded-full" />
									</motion.div>
								) : (
									<motion.div
										key="avatar"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: "spring",
											stiffness: 200,
										}}
									>
										<Avatar className="w-16 h-16">
											{profile?.avatar ? (
												<AvatarImage
													src={profile.avatar}
													alt={profile.username}
												/>
											) : (
												<AvatarFallback className="text-2xl bg-background border border-gray-600">
													{profile?.firstName?.charAt(
														0
													) || "?"}
												</AvatarFallback>
											)}
										</Avatar>
									</motion.div>
								)}
							</AnimatePresence>

							<div>
								<AnimatePresence mode="wait">
									{isLoading ? (
										<motion.div
											key="skeleton-content"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<Skeleton className="h-6 w-40 mb-2" />
											<Skeleton className="h-4 w-32" />
										</motion.div>
									) : (
										<motion.div
											key="profile-content"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.4 }}
										>
											<CardTitle className="text-xl font-bold">
												{profile?.firstName}{" "}
												{profile?.lastName}
											</CardTitle>
											<p className="text-gray-600">
												@{profile?.username}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</CardHeader>

						<CardContent>
							{isLoading ? (
								<motion.div
									key="loading"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-4 w-2/3" />
								</motion.div>
							) : error ? (
								<motion.div
									key="error"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
								>
									<Alert variant="destructive">
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											{error}
										</AlertDescription>
									</Alert>
								</motion.div>
							) : (
								<motion.div
									key="content"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ delay: 0.2 }}
								>
									<motion.p className="text-sm text-gray-700">
										<strong>Email:</strong> {profile?.email}
									</motion.p>
									<motion.p className="text-sm text-gray-700">
										<strong>Joined:</strong>{" "}
										{new Date(
											profile?.createdAt || ""
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</motion.p>

									<motion.div className="mt-4 flex space-x-4">
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Button
												variant="outline"
												onClick={handleLogout}
												className="hover:bg-foreground hover:text-background duration-300"
											>
												Logout
											</Button>
										</motion.div>
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Button
												variant="destructive"
												onClick={() =>
													setDeleteDialogOpen(true)
												}
											>
												Delete Profile
											</Button>
										</motion.div>
									</motion.div>
								</motion.div>
							)}
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>

			<AnimatePresence>
				{deleteDialogOpen && (
					<Dialog
						open={deleteDialogOpen}
						onOpenChange={setDeleteDialogOpen}
					>
						<DialogContent className="bg-background">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
							>
								<DialogHeader>
									<DialogTitle>Are you sure?</DialogTitle>
								</DialogHeader>
								<p className="text-gray-600 my-2">
									Deleting your profile is permanent and
									cannot be undone.
								</p>
								<DialogFooter>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											variant="outline"
											onClick={() =>
												setDeleteDialogOpen(false)
											}
											className="hover:bg-foreground hover:text-background duration-300"
										>
											Cancel
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											variant="destructive"
											onClick={handleDeleteProfile}
											disabled={isDeleting}
										>
											{isDeleting
												? "Deleting..."
												: "Delete Profile"}
										</Button>
									</motion.div>
								</DialogFooter>
							</motion.div>
						</DialogContent>
					</Dialog>
				)}
			</AnimatePresence>
		</motion.section>
	);
};

export default Profile;
