import { FileUploader } from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupDefaultValues } from "@/constants/data";
import { useToast } from "@/hooks/use-toast";
import { signupSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AxiosError } from "axios";
import axios from "@/utils/axios";
import { ErrorResponse } from "@/types/apiResponse";

export function Signup() {
	const [files, setFiles] = useState<File[]>([]);
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: signupDefaultValues,
	});

	async function onSubmit(values: z.infer<typeof signupSchema>) {
		try {
			const formData = new FormData();
			formData.append("firstName", values.firstName);
			formData.append("lastName", values.lastName);
			formData.append("username", values.username);
			formData.append("email", values.email);
			formData.append("password", values.password);

			if (files.length > 0) {
				formData.append("avatar", files[0]);
			}

			const res = await axios.post("/users/sign-up", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.data.success) {
				form.reset();
				navigate("/profile");
			}
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Signup failed.",
				description: errorMessage ?? "An error occurred while signup.",
				duration: 3000,
				variant: "destructive",
			});
		}
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
						name="firstName"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="First Name"
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
						name="lastName"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Last Name"
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Username"
									{...field}
									className="input-field"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Email"
										type="email"
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
						name="password"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Password"
										type="password"
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="avatar"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FileUploader
									onFieldChange={field.onChange}
									setFiles={setFiles}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<p className="text-md">
					Already have an account?{" "}
					<Link
						className="text-red-500 hover:underline duration-300"
						to="/sign-in"
					>
						Sign-in
					</Link>
				</p>

				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full"
				>
					{form.formState.isSubmitting ? "Submitting..." : "Signup"}
				</Button>
			</form>
		</Form>
	);
}
