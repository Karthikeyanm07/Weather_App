import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const CurrentSkeleton = ({}: Props) => {
	return (
		<Card
			childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
			title="Current Forecast"
		>
			<div className="flex flex-col gap-2 items-center">
				<Skeleton className="w-40 h-16" />
				<Skeleton className="size-[100px] rounded-full" />
				<Skeleton className="w-36 h-7 mb-2" />
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xl text-center">Local Time:</p>
				<Skeleton className="w-36 h-10" />
			</div>
			<div className="flex justify-between w-full">
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-500">Feels like</p>
					<Skeleton className="w-16 h-6" />
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-500">Humidity</p>
					<Skeleton className="w-16 h-6" />
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-500">Wind</p>
					<Skeleton className="w-16 h-6" />
				</div>
			</div>
		</Card>
	);
};

export default CurrentSkeleton;
