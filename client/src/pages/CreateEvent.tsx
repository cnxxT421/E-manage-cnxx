import EventForm from "@/components/shared/EventForm";
import { headerVariants, itemVariants } from "@/constants/animation";
import { motion } from "framer-motion";

const CreateEvent = () => {
	return (
		<motion.section
			initial="hidden"
			animate="visible"
			variants={headerVariants}
			className="py-20"
		>
			<motion.section
				variants={itemVariants}
				className="bg-primary-50 wrapper bg-dotted-pattern bg-cover bg-center wrapper py-8"
			>
				<motion.h3
					className="wrapper h3-bold text-center sm:text-left"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					Create An Event
				</motion.h3>
			</motion.section>

			<motion.div className="wrapper my-8">
				<EventForm />
			</motion.div>
		</motion.section>
	);
};

export default CreateEvent;
