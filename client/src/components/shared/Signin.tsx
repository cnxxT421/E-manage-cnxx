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
import { motion } from "framer-motion";

const Signin = () => {
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
				title: "Signin failed.",
				description: errorMessage ?? "An error occurred while signin.",
				duration: 3000,
				variant: "destructive",
			});
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-6"
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col gap-5"
				>
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
										className="input-field transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
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
										className="input-field transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</motion.div>

				<motion.p
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="text-md"
				>
					Don't have an account?{" "}
					<Link
						className="text-red-500 hover:underline duration-300"
						to="/sign-up"
					>
						Sign-up
					</Link>
				</motion.p>

				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5 }}
				>
					<Button
						type="submit"
						size="lg"
						disabled={form.formState.isSubmitting}
						className="button col-span-2 w-full transition-all duration-300 ease-in-out hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
					>
						{form.formState.isSubmitting
							? "Submitting..."
							: "Signin"}
					</Button>
				</motion.div>
			</form>
		</Form>
	);
};

export default Signin;
