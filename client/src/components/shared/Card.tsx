import { IEvent } from "@/types/event";
import { formatDateTime } from "@/utils/date";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MotionLink = motion.create(Link);

const Card = ({ event }: { event: IEvent }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			whileHover={{ y: -6, scale: 1.03 }}
			transition={{ duration: 0.3 }}
			className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl border border-gray-400 shadow-md transition-all hover:shadow-lg md:min-h-[438px]"
		>
			<MotionLink
				to={`/events/${event._id}`}
				style={{ backgroundImage: `url(${event.image})` }}
				className="flex-center flex-grow bg-cover bg-center text-grey-500"
				whileHover={{ scale: 1.05 }}
				transition={{ duration: 0.3 }}
			/>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4"
			>
				<motion.div
					className="flex gap-2"
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					<motion.span
						whileHover={{ scale: 1.05 }}
						className="p-semibold-14 w-min rounded-full bg-green-500/20 px-4 py-1 text-green-60"
					>
						{event.isFree ? "FREE" : `$${event.price}`}
					</motion.span>
					<motion.p
						whileHover={{ scale: 1.05 }}
						className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1"
					>
						{event.category.name}
					</motion.p>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="p-medium-16 p-medium-18 text-grey-500"
				>
					{formatDateTime(event.startDate).dateTime}
				</motion.p>

				<motion.div
					whileHover={{ scale: 1.01 }}
					transition={{ duration: 0.2 }}
				>
					<Link to={`/events/${event._id}`}>
						<p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
							{event.title}
						</p>
					</Link>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="w-full"
				>
					<p className="p-medium-14 md:p-medium-16 text-grey-600 text-right">
						- @{event.organizer.username}
					</p>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Card;
