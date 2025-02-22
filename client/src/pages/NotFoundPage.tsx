import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="text-center space-y-6"
			>
				<motion.h1
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 300 }}
					className="text-9xl font-bold text-red-500"
				>
					404
				</motion.h1>

				<motion.p
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ type: "spring", stiffness: 200 }}
					className="text-xl text-gray-700"
				>
					Oops! The page you're looking for doesn't exist.
				</motion.p>

				<motion.button
					onClick={handleGoHome}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					transition={{ type: "spring", stiffness: 250 }}
					className="mt-6 px-6 py-2 bg-foreground text-background font-semibold rounded-lg"
				>
					Go Home
				</motion.button>
			</motion.div>
		</div>
	);
};

export default NotFoundPage;
