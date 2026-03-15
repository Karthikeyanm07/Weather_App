import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";



const HourlySkeleton = () => {
	return (
		<Card
			childrenClassName="flex gap-6 overflow-x-scroll"
			title="Hourly Forecast (48 Hours)"
		>
			{Array.from({ length: 48 }).map((_, index) => {
				return (
					<div key={index} className="flex flex-col items-center 2xl:justify-between p-2">
						<Skeleton className="w-16 h-6 2xl:scale-10" />
						<Skeleton className="size-10 2xl:size-10 rounded-full" />
						<Skeleton className="w-10 h-6 2xl:scale-10" />
					</div>
				);
			})}
		</Card>
	);
};

export default HourlySkeleton;
