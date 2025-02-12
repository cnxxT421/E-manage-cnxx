import { IEvent } from "@/types/event";
import { formatDateTime } from "@/utils/date";
import { Link } from "react-router-dom";

const Card = ({ event }: { event: IEvent }) => {
	return (
		<div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
			<Link
				to={`/events/${event._id}`}
				style={{ backgroundImage: `url(${event.image})` }}
				className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
			/>

			<div className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4">
				<div className="flex gap-2">
					<span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
						{event.isFree ? "FREE" : `$${event.price}`}
					</span>
					<p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
						{event.category.name}
					</p>
				</div>

				<p className="p-medium-16 p-medium-18 text-grey-500">
					{formatDateTime(event.startDate).dateTime}
				</p>

				<Link to={`/events/${event._id}`}>
					<p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
						{event.title}
					</p>
				</Link>

				<div className=" w-full">
					<p className="p-medium-14 md:p-medium-16 text-grey-600 text-right">
						- @{event.organizer.username}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
