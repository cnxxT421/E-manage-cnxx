import { updateEventDefaultValues } from "@/constants/data";
import { useToast } from "@/hooks/use-toast";
import { updateEventSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import Dropdown from "./DropDown";
import { Textarea } from "../ui/textarea";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";
import LoadingSkeleton from "./Skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const UpdateEvent = () => {
	const { id } = useParams();
	const { toast } = useToast();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [eventData, setEventData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof updateEventSchema>>({
		resolver: zodResolver(updateEventSchema),
		defaultValues: eventData ?? updateEventDefaultValues,
	});

	useEffect(() => {
		if (!id) {
			navigate("/events");
		}

		async function fetchEvent() {
			try {
				const res = await axios.get(`/events/${id}`);
				setEventData(res.data.data);
			} catch (err) {
				const axiosError = err as AxiosError<ErrorResponse>;
				const errorMessage =
					axiosError.response?.data.message ||
					"An error occurred while fetching the event data.";
				setError(errorMessage);
			} finally {
				setIsLoading(false);
			}
		}

		fetchEvent();
	}, [id, navigate]);

	useEffect(() => {
		if (eventData) {
			form.reset({
				...eventData,
				categoryId: eventData.category._id,
			});
		}
	}, [eventData, form]);

	async function onSubmit(values: z.infer<typeof updateEventSchema>) {
		try {
			await axios.patch(`/events/${id}`, values);
			navigate(`/events/${id}`);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data.message ||
				"An error occurred while updating the event.";
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
	}

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Event title"
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Dropdown
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-1/2">
								<FormControl className="h-32">
									<Textarea
										placeholder="Description"
										{...field}
										className="textarea rounded-2xl"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-wrap gap-5 flex-col w-1/2">
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
											<img
												src="/src/assets/location-grey.svg"
												alt="calendar"
												width={24}
												height={24}
											/>

											<Input
												placeholder="Event location or Online"
												{...field}
												className="input-field"
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
											<img
												src="/src/assets/link.svg"
												alt="link"
												width={24}
												height={24}
											/>

											<Input
												placeholder="URL"
												{...field}
												className="input-field"
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="startDate"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<img
											src="/src/assets/calendar.svg"
											alt="calendar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-grey-600">
											Start Date:
										</p>
										<DatePicker
											selected={
												field.value
													? new Date(field.value)
													: null
											}
											onChange={(date: Date | null) =>
												field.onChange(date)
											}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDate"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<img
											src="/src/assets/calendar.svg"
											alt="calendar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-grey-600">
											End Date:
										</p>
										<DatePicker
											selected={
												field.value
													? new Date(field.value)
													: null
											}
											onChange={(date: Date | null) =>
												field.onChange(date)
											}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full"
				>
					{form.formState.isSubmitting
						? "Updating..."
						: `Update Event`}
				</Button>
			</form>
		</Form>
	);
};

export default UpdateEvent;
