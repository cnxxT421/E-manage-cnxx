import { signinDefaultValues } from "@/constants/data";
import { signinSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/utils/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ErrorResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

export function Signin() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
		defaultValues: signinDefaultValues,
	});

	async function onSubmit(values: z.infer<typeof signinSchema>) {
		try {
			const res = await axios.post("/users/sign-in", values);
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
						name="username"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Username"
										type="text"
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

				<p className="text-md">
					Don't have an account?{" "}
					<Link
						className="text-red-500 hover:underline duration-300"
						to="/sign-up"
					>
						Sign-up
					</Link>
				</p>

				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full"
				>
					{form.formState.isSubmitting ? "Submitting..." : "Signin"}
				</Button>
			</form>
		</Form>
	);
}
