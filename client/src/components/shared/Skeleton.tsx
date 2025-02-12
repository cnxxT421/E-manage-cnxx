import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {
	return (
		<div className="loading-skeleton flex flex-wrap gap-5">
			<div className="w-full md:w-1/2 flex flex-col gap-5">
				<Skeleton className="h-10 w-3/4 rounded-lg" />

				<Skeleton className="h-10 w-1/2 rounded-lg" />
				<Skeleton className="h-16 w-full rounded-lg" />

				<Skeleton className="h-10 w-2/3 rounded-lg" />
				<Skeleton className="h-10 w-3/4 rounded-lg" />
			</div>

			<div className="w-full md:w-1/2 flex flex-col gap-5">
				<Skeleton className="h-12 w-3/4 rounded-lg" />
				<Skeleton className="h-12 w-3/4 rounded-lg" />
			</div>

			<div className="w-full mt-5">
				<Skeleton className="h-12 rounded-lg w-full" />
			</div>
		</div>
	);
};

export default LoadingSkeleton;
