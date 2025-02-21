import { motion } from "framer-motion";
import { Button } from "../ui/button";

const CTA = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
			className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
		>
			<div className="max-w-4xl mx-auto px-4 text-center text-white">
				<motion.h2
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.8 }}
					className="text-3xl font-bold mb-6"
				>
					Ready to Transform Your Events?
				</motion.h2>
				<motion.p
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4, duration: 0.8 }}
					className="text-xl mb-8 opacity-90"
				>
					Join thousands of event planners who trust E-manage
				</motion.p>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
						Start Free Trial
					</Button>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default CTA;
