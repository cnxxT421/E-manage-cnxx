import Signup from "@/components/shared/Signup";
import { headerVariants, itemVariants } from "@/constants/animation";
import { motion } from "framer-motion";

const SignupPage = () => {
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
					Create An Account
				</motion.h3>
			</motion.section>

			<motion.div className="wrapper my-8 flex justify-center items-center">
				<Signup />
			</motion.div>
		</motion.section>
	);
};

export default SignupPage;
